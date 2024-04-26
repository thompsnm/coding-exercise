import React from "react";

export default function InvoiceDetails({ invoiceDetails }) {
    return (
        <div>
            <p id="invoice_details_campaign_id">Campaign ID: { invoiceDetails.campaign_id }</p>
            <p id="invoice_details_booked_amount">Booked Amount: { invoiceDetails.booked_amount }</p>
            <p id="invoice_details_actual_amount">Actual Amount: { invoiceDetails.actual_amount }</p>
            <p id="invoice_details_adjustments">Adjustments: { invoiceDetails.adjustments }</p>
        </div>
    );
}