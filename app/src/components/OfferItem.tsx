import { useNavigate } from 'react-router-dom'
import './OfferItemCss.css'

export function OfferItem() {

    const event = 'ETHPrague'
    const title = 'Highshool student looking for a place to stay'
    const dayFrom = '9'
    const dayTo = '11'
    const month = 'June'
    const year = '2023'
    const location = 'Prague, Czechia'
    const description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nulla non arcu lacinia neque faucibus fringilla. Maecenas ipsum velit, consectetuer eu lobortis ut, dictum at dui. Vivamus ac leo pretium faucibus. Quisque tincidunt scelerisque libero. In enim a arcu imperdiet malesuada. In convallis. Praesent id justo in neque elementum ultrices. In convallis. Duis viverra diam non justo. Nulla non arcu lacinia neque faucibus fringilla.'
    const wallet = 'Wallet Address: '
    const walletAddress = '0x34598234bkjj34592u34bivefu9ufvasdu9v'
    const twitter = 'Twitter: '
    const twitterAddress = undefined
    const stakeAmount = '1'
    const stakeCrypto = 'ETH'
    const trustAmount = '180'
    const trust = 'TRUST'

    const navigate = useNavigate()
    return(
        <div>
            <div className="row">
                    <div className="column-side">
                        <h2><b>{event}</b></h2>
                        <p><b>{dayFrom} - {dayTo} {month} {year}</b></p>
                        <p><b>{location}</b></p>
                    </div>
                    <div className="column-middle">   
                    <h2><b>{title}</b></h2> 
                    <p>{description}</p>
                    <p>{wallet}{walletAddress}</p>
                    {twitterAddress && <p>Twitter: {twitterAddress}</p>}
                    </div>
                    <div className="column-side">
                    <h2><b>Stake:</b></h2> 
                    <h2><b>{stakeAmount} {stakeCrypto}</b></h2> 
                    <h2><button onClick={() => navigate("/offerdetail")}>Show more</button></h2> 
                    <h2><button>Add Stake</button></h2> 
                    <h2><button>Accept</button></h2>
                    </div>
                
            </div>
        </div>
    );
}