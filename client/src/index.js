import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root, { loader as rootLoader } from './routes/root';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import Campaign, { loader as campaignLoader } from './routes/campaign';
import Invoice, { loader as invoiceLoader } from './routes/invoice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
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
