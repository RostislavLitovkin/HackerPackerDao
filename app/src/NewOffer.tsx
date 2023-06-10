import { ChangeEvent, FormEvent, useState } from "react";

import "./NewOffer.css"
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Header } from "./components/Header";

interface FormValues {
    title: string;
    event: string;
    from_date: string;
    till_date: string;
    location: string;
    description: string;
    stake: number;
}

export function NewOffer() {

    const { config } = usePrepareContractWrite({
        address: '0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a',
        abi: [{ "inputs": [{ "internalType": "address", "name": "_escrowToken", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowId", "type": "uint256" }, { "indexed": false, "internalType": "enum Hackbacker.User", "name": "userType", "type": "uint8" }], "name": "EscrowContested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "host", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "hostDeposit", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "guestDeposit", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endTimestamp", "type": "uint256" }], "name": "EscrowCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "depositor", "type": "address" }, { "indexed": false, "internalType": "enum Hackbacker.User", "name": "userType", "type": "uint8" }], "name": "EscrowDeposited", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "hostPercentage", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "guestPercentage", "type": "uint256" }], "name": "EscrowResolved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "escrowId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "enum Hackbacker.User", "name": "userType", "type": "uint8" }], "name": "EscrowWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "_escrowId", "type": "uint256" }, { "internalType": "enum Hackbacker.User", "name": "_user", "type": "uint8" }], "name": "contest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_hostDeposit", "type": "uint256" }, { "internalType": "uint256", "name": "_guestDeposit", "type": "uint256" }, { "internalType": "uint256", "name": "_escrowEndTimestamp", "type": "uint256" }, { "internalType": "bytes", "name": "_metadata", "type": "bytes" }], "name": "createEscrow", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_escrowId", "type": "uint256" }, { "internalType": "enum Hackbacker.User", "name": "_user", "type": "uint8" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_escrowId", "type": "uint256" }, { "internalType": "bytes", "name": "_metadata", "type": "bytes" }], "name": "editEscrowMetadata", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "escrowLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "escrowToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "escrows", "outputs": [{ "internalType": "address", "name": "host", "type": "address" }, { "internalType": "address", "name": "guest", "type": "address" }, { "internalType": "uint256", "name": "hostDeposit", "type": "uint256" }, { "internalType": "uint256", "name": "guestDeposit", "type": "uint256" }, { "internalType": "enum Hackbacker.EscrowMemberState", "name": "hostState", "type": "uint8" }, { "internalType": "enum Hackbacker.EscrowMemberState", "name": "guestState", "type": "uint8" }, { "internalType": "enum Hackbacker.EscrowState", "name": "state", "type": "uint8" }, { "internalType": "uint256", "name": "escrowEndTimestamp", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "dateFrom", "type": "uint256" }, { "internalType": "uint256", "name": "dateTo", "type": "uint256" }, { "internalType": "string", "name": "title", "type": "string" }, { "internalType": "string", "name": "eventName", "type": "string" }, { "internalType": "string", "name": "description", "type": "string" }, { "internalType": "string", "name": "location", "type": "string" }], "internalType": "struct Hackbacker.EscrowMetadata", "name": "metadata", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_escrowId", "type": "uint256" }, { "internalType": "uint256", "name": "_hostPercentage", "type": "uint256" }, { "internalType": "uint256", "name": "_guestPercentage", "type": "uint256" }], "name": "resolveContest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_escrowToken", "type": "address" }], "name": "setToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_escrowId", "type": "uint256" }, { "internalType": "enum Hackbacker.User", "name": "_user", "type": "uint8" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }],
        functionName: 'createEscrow',
    })

    const { data, isLoading, isSuccess, write } = useContractWrite(config)
    const { isConnected } = useAccount()

    const [values, setValues] = useState<FormValues>({
        title: '',
        event: '',
        from_date: '',
        till_date: '',
        location: '',
        description: '',
        stake: 0,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values);
        
    };

    return (
        <>

            <div className="container">
                <Header />
                <form className="form" onSubmit={handleSubmit}>
                    <div style={{ fontWeight: 900 }}>Offer / Ask</div>
                    {isConnected ?
                        <>

                            <br />
                            <input
                                className="input"
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={values.title}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="input"
                                type="text"
                                name="event"
                                placeholder="Event"
                                value={values.event}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="input"
                                type="date"
                                name="from_date"
                                placeholder="From"
                                value={values.from_date}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="input"
                                type="date"
                                name="till_date"
                                placeholder="Till"
                                value={values.till_date}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="input"
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={values.location}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                className="input"
                                name="description"
                                placeholder="Description"
                                value={values.description}
                                onChange={(event) => {
                                    setValues({ ...values, [event.target.name]: event.target.value });
                                }
                                }
                                required
                            />

                            <input
                                className="input"
                                type="number"
                                name="stake"
                                placeholder="Stake amount"
                                value={values.stake}
                                onChange={handleChange}
                                required
                            />

                            <button className="button" type="submit">
                                Submit
                            </button>
                        </>
                        :
                        <div style={{ margin: "auto" }}>
                            Connect your wallet please
                        </div>}
                </form>
            </div>
        </>
    )
}