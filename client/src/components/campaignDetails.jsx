import React from "react";
import { Link } from "react-router-dom";

export default function CampaignDetails({ campaignDetails }) {
    return (
        <div>
            <p>ID: { campaignDetails.campaignId }</p>
            <p>Name: { campaignDetails.campaignName }</p>
            <Link to={`invoice`}>Invoice</Link>
        </div>
    );
}