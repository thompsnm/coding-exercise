import React from "react";

export default function InvoiceDetails({ invoiceDetails }) {
    return (
        <div>
            <p>Booked Amount: { invoiceDetails.bookedAmount }</p>
            <p>Actual Amount: { invoiceDetails.actualAmount }</p>
            <p>Adjustments: { invoiceDetails.adjustments }</p>
        </div>
    );
}