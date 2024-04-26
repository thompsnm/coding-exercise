import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdDetails({ adDetails }) {
    return (
        <div>
            <p id="ad_details_id">Ad ID: { adDetails.id }</p>
            <p id="ad_details_name">Ad Name: { adDetails.name }</p>
            <p id="ad_details_campaign_id">Campaign ID: { adDetails.campaign_id }</p>
            <p id="ad_details_booked_amount">Booked Amount: { adDetails.booked_amount }</p>
            <p id="ad_details_actual_amount">Actual Amount: { adDetails.actual_amount }</p>
            <p id="ad_details_adjustments">Adjustments: { adDetails.adjustments }</p>
        </div>
    );
}