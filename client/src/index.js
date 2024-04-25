import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root, {
  loader as rootLoader,
  action as rootAction,
} from './routes/root';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Campaign, { loader as campaignLoader } from './routes/campaign';
import Invoice, { loader as invoiceLoader } from './routes/invoice';
import Ad, {
  loader as adLoader,
  action as adAction,
} from './routes/ad';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
  },
  {
    path: "campaign/:campaignId",
    element: <Campaign />,
    loader: campaignLoader,
  },
  {
    path: "campaign/:campaignId/invoice",
    element: <Invoice />,
    loader: invoiceLoader,
  },
  {
    path: "ad/:adId",
    element: <Ad />,
    loader: adLoader,
    action: adAction,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="App">
    <React.StrictMode>
      <RouterProvider router={router} /> 
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
