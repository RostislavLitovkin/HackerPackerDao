// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Hackbacker is Ownable {
    enum EscrowMemberState {
        CREATED,
        DEPOSITED,
        WITHDRAWN,
        CONTESTED
    }

    enum EscrowState {
        CREATED,
        ONGOING,
        WITHDRAWN,
        CONTESTED,
        RESOLVED
    }

    enum User {
        HOST,
        GUEST
    }

    struct Escrow {
        address host;
        address guest;
        uint256 hostDeposit;
        uint256 guestDeposit;
        EscrowMemberState hostState;
        EscrowMemberState guestState;
        EscrowState state;
        uint256 escrowEndTimestamp;
        EscrowMetadata metadata;
    }

    struct EscrowMetadata {
        uint256 dateFrom;
        uint256 dateTo;
        string title;
        string eventName;
        string description;
        string location;
    }

    Escrow[] public escrows;

    IERC20 public escrowToken;

    event EscrowCreated(
        uint256 escrowId,
        address host,
        uint256 hostDeposit,
        uint256 guestDeposit,
        uint256 endTimestamp
    );
    event EscrowDeposited(uint256 escrowId, address depositor, User userType);
    event EscrowWithdrawn(uint256 escrowId, uint256 amount, User userType);
    event EscrowContested(uint256 escrowId, User userType);
    event EscrowResolved(
        uint256 escrowId,
        uint256 hostPercentage,
        uint256 guestPercentage
    );

    constructor(address _escrowToken) {
        escrowToken = IERC20(_escrowToken);
    }

    function setToken(address _escrowToken) external onlyOwner {
        escrowToken = IERC20(_escrowToken);
    }

    function escrowLength() external view returns (uint256) {
        return escrows.length;
    }

    function createEscrow(
        uint256 _hostDeposit,
        uint256 _guestDeposit,
        uint256 _escrowEndTimestamp,
        bytes memory _metadata
    ) external returns (uint256) {
        require(
            _escrowEndTimestamp > block.timestamp,
            "End timestamp must be in the future"
        );

        Escrow memory escrow;

        escrow.host = msg.sender;
        escrow.guest = address(0);
        escrow.hostState = EscrowMemberState.CREATED;
        escrow.guestState = EscrowMemberState.CREATED;
        escrow.state = EscrowState.CREATED;
        escrow.hostDeposit = _hostDeposit;
        escrow.guestDeposit = _guestDeposit;
        escrow.escrowEndTimestamp = _escrowEndTimestamp;

        escrows.push(escrow);

        editEscrowMetadata(escrows.length - 1, _metadata);

        emit EscrowCreated(
            escrows.length - 1,
            msg.sender,
            escrow.hostDeposit,
            escrow.guestDeposit,
            escrow.escrowEndTimestamp
        );

        return escrows.length - 1;
    }

    function editEscrowMetadata(
        uint256 _escrowId,
        bytes memory _metadata
    ) public {
        Escrow storage escrow = escrows[_escrowId];

        require(
            escrow.host == msg.sender,
            "Only the host can edit the escrow metadata"
        );

        require(
            escrow.state == EscrowState.CREATED,
            "Escrow metadata can only be edited before the escrow starts"
        );

        EscrowMetadata memory metadata = escrow.metadata;

        (
            uint256 _dateFrom,
            uint256 _dateTo,
            string memory _title,
            string memory _eventName,
            string memory _description,
            string memory _location
        ) = abi.decode(
                _metadata,
                (uint256, uint256, string, string, string, string)
            );

        metadata.dateFrom = _dateFrom;
        metadata.dateTo = _dateTo;

        metadata.title = _title;
        metadata.eventName = _eventName;
        metadata.description = _description;
        metadata.location = _location;

        escrow.metadata = metadata;
    }

    function deposit(uint256 _escrowId, User _user) external {
        Escrow storage escrow = escrows[_escrowId];

        require(
            escrow.escrowEndTimestamp >= block.timestamp,
            "Escrow has ended"
        );

        if (_user == User.HOST) {
            require(
                escrow.hostState == EscrowMemberState.CREATED,
                "Host has already deposited"
            );

            escrow.hostState = EscrowMemberState.DEPOSITED;
            escrowToken.transferFrom(
                msg.sender,
                address(this),
                escrow.hostDeposit
            );
        } else {
            require(
                escrow.guestState == EscrowMemberState.CREATED,
                "Escrow already has a guest"
            );

            escrow.guest = msg.sender;
            escrow.guestState = EscrowMemberState.DEPOSITED;

            escrowToken.transferFrom(
                msg.sender,
                address(this),
                escrow.guestDeposit
            );
        }

        if (
            escrow.hostState == EscrowMemberState.DEPOSITED &&
            escrow.guestState == EscrowMemberState.DEPOSITED
        ) {
            escrow.state = EscrowState.ONGOING;
        }

        emit EscrowDeposited(_escrowId, msg.sender, _user);
    }

    function withdraw(uint256 _escrowId, User _user) external {
        Escrow storage escrow = escrows[_escrowId];

        require(escrow.state != EscrowState.CONTESTED, "Escrow is contested");
        require(
            escrow.escrowEndTimestamp < block.timestamp,
            "Escrow has not ended"
        );

        if (_user == User.HOST) {
            require(
                escrow.hostState == EscrowMemberState.DEPOSITED,
                "Host has already withdrawn / Hasn't deposited yet"
            );

            escrow.state = EscrowState.WITHDRAWN;
            escrow.hostState = EscrowMemberState.WITHDRAWN;

            escrowToken.transfer(msg.sender, escrow.hostDeposit);
        } else {
            require(
                escrow.guestState == EscrowMemberState.DEPOSITED,
                "Guest has already withdrawn / Hasn't deposited yet"
            );

            escrow.state = EscrowState.WITHDRAWN;
            escrow.guestState = EscrowMemberState.WITHDRAWN;

            escrowToken.transfer(msg.sender, escrow.guestDeposit);
        }

        emit EscrowWithdrawn(
            _escrowId,
            _user == User.HOST ? escrow.hostDeposit : escrow.guestDeposit,
            _user
        );
    }

    function contest(uint256 _escrowId, User _user) external {
        Escrow storage escrow = escrows[_escrowId];

        require(
            escrow.escrowEndTimestamp > block.timestamp,
            "Escrow has already ended"
        );

        if (_user == User.HOST) {
            require(escrow.host == msg.sender, "Only host can contest");

            escrow.hostState = EscrowMemberState.CONTESTED;
        } else {
            require(escrow.guest == msg.sender, "Only guest can contest");

            escrow.guestState = EscrowMemberState.CONTESTED;
        }

        escrow.state = EscrowState.CONTESTED;
        emit EscrowContested(_escrowId, _user);
    }

    function resolveContest(
        uint256 _escrowId,
        uint256 _hostPercentage,
        uint256 _guestPercentage
    ) external onlyOwner {
        require(
            _hostPercentage + _guestPercentage == 100,
            "Percentages must add up to 100"
        );

        Escrow storage escrow = escrows[_escrowId];

        require(
            escrow.state == EscrowState.CONTESTED,
            "Escrow is not contested"
        );

        uint256 totalDeposit = escrow.hostDeposit + escrow.guestDeposit;
        uint256 hostAmount = (totalDeposit * _hostPercentage) / 100;
        uint256 guestAmount = (totalDeposit * _guestPercentage) / 100;

        escrowToken.transfer(escrow.host, hostAmount);
        escrow.hostState = EscrowMemberState.WITHDRAWN;

        emit EscrowWithdrawn(_escrowId, hostAmount, User.HOST);

        escrowToken.transfer(escrow.guest, guestAmount);
        escrow.guestState = EscrowMemberState.WITHDRAWN;

        emit EscrowWithdrawn(_escrowId, guestAmount, User.GUEST);

        escrow.state = EscrowState.RESOLVED;
        emit EscrowResolved(_escrowId, _hostPercentage, _guestPercentage);
    }
}
