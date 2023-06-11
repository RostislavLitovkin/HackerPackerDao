import { useNavigate } from 'react-router-dom'
import './OfferItemCss.css'

interface Props {
    data: any[]
}

export function OfferItem(props: Props) {

    const { data } = props

    const event =  data[8].eventName
    const title =  data[8].title
    const dayFrom = '9'
    const dayTo = '11'
    const month = 'June'
    const year = '2023'
    const location = data[8].location
    const description =  data[8].description
    const walletAddress = data[0]
    const twitterAddress = undefined
    const stakeAmount = parseInt(data[2])
    const stakeCrypto = 'ETH'

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
                    {walletAddress && <p>Wallet: {walletAddress}</p>}
                    {twitterAddress && <p>Twitter: {twitterAddress}</p>}
                    </div>
                    <div className="column-side">
                    <h2><b>Stake:</b></h2> 
                    <h2><b>{stakeAmount} {stakeCrypto}</b></h2>
                    <h2><button>Add Stake</button></h2> 
                    <h2><button>Accept</button></h2>
                    </div>
                
            </div>
        </div>
    );
}