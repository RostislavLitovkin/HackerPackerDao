import { OfferItem } from './components/OfferItem'
import './DashboardCss.css'
import { Header } from './components/Header'
import { useContractRead } from 'wagmi'
import abi from "./abi/abi.json"

function dashboardLength() {
  const { data, isError, isLoading } = useContractRead({
    address: '0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a',
    abi: abi,
    functionName: 'escrowLength',
  })

  return data
}

function dashboardEscrow() {
  const { data, isError, isLoading } = useContractRead({
    address: '0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a',
    abi: abi,
    functionName: 'escrows', 
    args: [0]
  })

  return data
}

export function Dashboard() {

  const length = parseInt(dashboardLength() + "")

  for (var i = 0; i < length; i++) {
    
  }

  return (
    <>
      <Header />

     { /*<div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={() => {}}>Your Agreements</button>
        <button onClick={() => {}}>Disputes</button>
        <button onClick={() => {}}>Add New Request</button>
  </div> */ }

    

    {
       {
        <div className='dashboard'>
          <OfferItem data={dashboardEscrow()} />
        </div>
      }
}

    </>
  )
}
