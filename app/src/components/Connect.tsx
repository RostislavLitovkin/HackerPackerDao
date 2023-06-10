import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import "./Connect.css"

export function Connect() {
    const {connector, isConnected, address } = useAccount()
    const {
        connect,
        connectors,
        error,
        isLoading,
        pendingConnector,
        
    } = useConnect()

    const { data: ensName } = useEnsName({ address })
    const {disconnect} = useDisconnect()

    

  return (
    <div style={{marginLeft: "Auto", height: "60px" }}>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()} className='connect-button'>
            Disconnect from {ensName ?? address?.substring(0, 8) + ".."}
          </button>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}
            className='connect-button'>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

            {
            error && <div>{
                (error as BaseError).shortMessage
            }</div>
        } </div>
    )
}
