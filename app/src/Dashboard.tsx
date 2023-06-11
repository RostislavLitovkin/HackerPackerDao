import { OfferItem } from "./components/OfferItem";
import "./DashboardCss.css";
import { Header } from "./components/Header";
import {
  Address,
  useContractInfiniteReads,
  useContractRead,
  useContractReads,
} from "wagmi";
import { hackbackerAbi } from "./abi/hackbacker";
import { BigNumber } from "ethers";

function useDashboardLength() {
  const { data, isError, isLoading } = useContractRead({
    address: "0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a",
    abi: hackbackerAbi,
    functionName: "escrowLength",
  });

  return data;
}

function useDashboardEscrows(length: number | undefined) {
  const { data, isError, isLoading } = useContractReads({
    contracts: new Array(length).fill(0).map(
      (_, index) =>
        ({
          address: "0x826b3A6F625da5CF904D9E8cCf8817AB89d4899a" as Address,
          abi: hackbackerAbi,
          functionName: "escrows",
          args: [BigInt(index)] as const,
        } as const)
    ),
    enabled: !!length,
    allowFailure: false,
  });

  return data;
}

export function Dashboard() {
  const escrowLength = useDashboardLength();
  const escrows = useDashboardEscrows(Number(escrowLength));

  return (
    <>
      <Header />

      {/*<div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={() => {}}>Your Agreements</button>
        <button onClick={() => {}}>Disputes</button>
        <button onClick={() => {}}>Add New Request</button>
  </div> */}

      {escrows?.map((thing: any, index) => {
        console.log("THing: " + thing);
        return (
          <div className="dashboard" key={index}>
            <OfferItem key={index} data={thing} />
          </div>
        );
      })}
    </>
  );
}
