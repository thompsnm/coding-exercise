import React from "react";
import { useLoaderData } from "react-router-dom";
import InvoiceDetails from "../components/invoiceDetails";

export async function loader({ params }) {
    try {
        const response = await fetch(`/api/campaign/${params.campaignId}/invoice`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const body = await response.json();
        return {
            campaignId: params.campaignId,
            detailsFound: true,
            invoiceDetails: body,
        };
    } catch (error) {
        return {
            campaignId: params.campaignId,
            detailsFound: false,
            invoiceDetails: {},
        };
    }
}

export default function Invoice() {
    const { campaignId, detailsFound, invoiceDetails } = useLoaderData();

    let details = detailsFound
        ? <InvoiceDetails invoiceDetails={ invoiceDetails } />
        : <p>No details found for this invoice!</p>

    return (
        <div>
            <header>
                <h1>Campaign {campaignId} Invoice</h1>
            </header>
            {details}
        </div>
    );
}