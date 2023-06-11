import { OfferItem } from './components/OfferItem'
import './DashboardCss.css'
import { Header } from './components/Header'


export function Dashboard() {

  return (
    <>
      <Header />

     { /*<div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={() => {}}>Your Agreements</button>
        <button onClick={() => {}}>Disputes</button>
        <button onClick={() => {}}>Add New Request</button>
  </div> */ }

    


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
