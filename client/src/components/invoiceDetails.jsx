import React from "react";

export default function InvoiceDetails({ invoiceDetails }) {
    return (
        <div>
            <p>Campaign ID: { invoiceDetails.campaign_id }</p>
            <p>Booked Amount: { invoiceDetails.booked_amount }</p>
            <p>Actual Amount: { invoiceDetails.actual_amount }</p>
            <p>Adjustments: { invoiceDetails.adjustments }</p>
        </div>
    );
}