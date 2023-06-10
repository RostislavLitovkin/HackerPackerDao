import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import "./Connect.css"

export function Connect() {
    const {connector, isConnected} = useAccount()
    const {
        connect,
        connectors,
        error,
        isLoading,
        pendingConnector
    } = useConnect()
    const {disconnect} = useDisconnect()

  return (
    <div style={{marginLeft: "Auto",}}>
      <div>
        {isConnected && (
          <button onClick={() => disconnect()} className='connect-button'>
            Disconnect from {connector?.name}
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
