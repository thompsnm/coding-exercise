import React from "react";
import { useLoaderData } from "react-router-dom";
import InvoiceDetails from "../components/invoiceDetails";

export async function loader({ params }) {
    const data = {
        detailsFound: false,
        invoiceDetails: {},
    };

    const detailsResponse = await fetch(`/api/campaign/${params.campaignId}/invoice`);
    if (detailsResponse.ok) {
        data.detailsFound = true;
        data.invoiceDetails = await detailsResponse.json();
    }

    return data;
}

export default function Invoice() {
    const { detailsFound, invoiceDetails } = useLoaderData();

    let details = detailsFound
        ? <InvoiceDetails invoiceDetails={ invoiceDetails } />
        : <p>No details found for this invoice!</p>

    return (
        <div>
            <header>
                <h1>Campaign Invoice</h1>
            </header>
            {details}
        </div>
    );
}