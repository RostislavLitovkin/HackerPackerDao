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

function dashboardEscrow(index: number) {
  const { data, isError, isLoading } = useContractRead({
    address: '0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a',
    abi: abi,
    functionName: 'escrows',
    args: [index]
  })

  console.log("Fetching")
  return data
}

export function Dashboard() {

  const length = parseInt(dashboardLength() + "")

  console.log(length)

  let d: any[] = []
  for (var i = 0; i < length; i++) {
    d.push(dashboardEscrow(i))
  }

  console.log(d)

  return (
    <>
      <Header />

      { /*<div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={() => {}}>Your Agreements</button>
        <button onClick={() => {}}>Disputes</button>
        <button onClick={() => {}}>Add New Request</button>
  </div> */ }



      {
        d.map((thing: any, index) => {
          console.log("THing: " + thing)
          return <div className='dashboard' key={index}>
            <OfferItem key={index} data={thing} />
          </div>
        })
      }


    </>
  )
}
