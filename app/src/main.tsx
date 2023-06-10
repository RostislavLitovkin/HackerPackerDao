import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'

import { App } from './App'
import { Dashboard } from './Dashboard'
import { config } from './wagmi'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NewOffer } from './NewOffer'
import { OfferDetail } from './OfferDetail'
import "./main.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/newoffer",
    element: <NewOffer />
  },
  {
    path: "/offerdetail",
    element: <OfferDetail />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RouterProvider router={router} />
    </WagmiConfig>
  </React.StrictMode>,
)
