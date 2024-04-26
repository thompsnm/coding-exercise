import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdDetails({ adDetails }) {
    return (
        <div>
            <p>Ad ID: { adDetails.id }</p>
            <p>Ad Name: { adDetails.name }</p>
            <p>Campaign ID: { adDetails.campaign_id }</p>
            <p>Booked Amount: { adDetails.booked_amount }</p>
            <p>Actual Amount: { adDetails.actual_amount }</p>
            <p>Adjustments: { adDetails.adjustments }</p>
        </div>
    );
}