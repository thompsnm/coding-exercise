import React from "react";

export default function InvoiceDetails({ invoiceDetails }) {
    return (
        <div>
            <p id="campaign_id">Campaign ID: { invoiceDetails.campaign_id }</p>
            <p id="booked_amount">Booked Amount: { invoiceDetails.booked_amount }</p>
            <p id="actual_amount">Actual Amount: { invoiceDetails.actual_amount }</p>
            <p id="adjustments">Adjustments: { invoiceDetails.adjustments }</p>
        </div>
    );
}