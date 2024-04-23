import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import CampaignDetails from "../components/campaignDetails";

export async function loader({ params }) {
    try {
        const response = await fetch(`/api/ads?campaign_id=${params.campaignId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const body = await response.json();
        return {
            campaignId: params.campaignId,
            detailsFound: true,
            initialAds: body,
        };
    } catch (error) {
        console.error(error.message);
        return {
            campaignId: params.campaignId,
            detailsFound: false,
            initialAds: [],
        };
    }
}

export default function Campaign() {
    const { campaignId, detailsFound, initialAds } = useLoaderData();
    let [ads, setAds] = useState(initialAds);

    let details = detailsFound
        ? <CampaignDetails initialAds={ ads } />
        : <p>No details found for this campaign!</p>

    return (
        <div>
            <header>
                <h1>Campaign {campaignId}</h1>
            </header>
            {details}
        </div>
    );
}