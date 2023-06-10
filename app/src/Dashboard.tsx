import { useAccount } from 'wagmi'
import { Connect } from './components/Connect'
import { OfferItem } from './components/OfferItem'
import './DashboardCss.css'

export function Dashboard() {

  return (
    <>
      <Connect />
        <ul className='buttonsList'><button>Connect</button></ul>
        <ul className='buttonsList'></ul><button>Your Agreements</button>
        <ul className='buttonsList'></ul><button>Disputes</button>
        <ul className='buttonsList'></ul><button>Add New Request</button>
      
      

      <div className='dashboard'>
        <OfferItem/>
        </div>
        <div className='dashboard'>
        <OfferItem/>
        </div>
        <div className='dashboard'>
        <OfferItem/>
        </div>

      

    
      
    </>
  )
}
