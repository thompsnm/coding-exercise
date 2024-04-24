import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdsList from "../components/adsList";
import CampaignDetails from "../components/campaignDetails";

export async function loader({ params }) {
    const data = {
        campaignId: params.campaignId,
        detailsFound: false,
        adsFound: false,
        initialAds: [],
        campaignName: "",
    };

    const detailsResponse = await fetch(`/api/campaign/${params.campaignId}`);
    const adsResponse = await fetch(`/api/ads?campaign_id=${params.campaignId}`);

    if (detailsResponse.ok) {
        data.detailsFound = true;
        data.campaignName = (await detailsResponse.json()).name;
    }
    if (adsResponse.ok) {
        data.adsFound = true;
        data.initialAds = await adsResponse.json();
    }

    return data;
}

export default function Campaign() {
    const { campaignId, adsFound, initialAds, campaignName, detailsFound } = useLoaderData();
    let campaignDetails = { campaignId, campaignName };
    let [ads, setAds] = useState(initialAds);

    let adsList = adsFound
        ? <AdsList initialAds={ ads } />
        : <p>No ads found for this campaign!</p>
    
    let details = detailsFound
        ? <CampaignDetails campaignDetails={ campaignDetails } />
        : <p>No details found for this campaign!</p>

    return (
        <div>
            <header>
                <h1>Campaign Details</h1>
            </header>
            {details}
            {adsList}
        </div>
    );
}