import { useAccount } from 'wagmi'
import { Connect } from './components/Connect'
import { OfferItem } from './components/OfferItem'
import './DashboardCss.css'
import { Header } from './components/Header'

export function Dashboard() {

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button>Your Agreements</button>
        <button>Disputes</button>
        <button>Add New Request</button>
      </div>



      <div className='dashboard'>
        <OfferItem />
      </div>
      <div className='dashboard'>
        <OfferItem />
      </div>
      <div className='dashboard'>
        <OfferItem />
      </div>

    </>
  )
}
