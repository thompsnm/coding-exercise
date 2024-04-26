import React, { useState } from "react";
import { useLoaderData, Form } from "react-router-dom";
import AdsList from "../components/adsList";
import CampaignDetails from "../components/campaignDetails";

export async function loader({ params }) {
    const data = {
        campaignId: params.campaignId,
        detailsFound: false,
        adsFound: false,
        ads: [],
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
        data.ads = await adsResponse.json();
    }

    console.log("in loader: ");
    console.log(data);
    return data;
}

export async function action({ params, request }) {
    // In theory FormData should be able to be sent to the server url-encoded.
    // However, I was having trouble getting my Express server to properly
    // decode it from that content type. I worked around the issue by
    // decoding the formData client side into JSON, stingifying that, and
    // sending that over the wire.
    let formData = Object.fromEntries(await request.formData());
    formData.campaign_id = params.campaignId;
    const data = [];

    const response = await fetch(
        `/api/ads`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: request.method,
            body: JSON.stringify(formData),
        },
    );

    if (response.ok) {
        data.detailsFound = true;
        data.adDetails = await response.json();
    }

    return data;
}

export default function Campaign() {
    let { campaignId, adsFound, ads, campaignName, detailsFound } = useLoaderData();
    let campaignDetails = { campaignId, campaignName };
    console.log(ads);

    let adsList = adsFound
        ? <AdsList ads={ ads } />
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
            <p>Create new Ad:</p>
            <Form method="put" action={`/campaign/${campaignId}`}>
                <label for="name">Ad Name</label>
                <input type="text" id="name" name="name" />
                <label for="booked_amount">Booked Amount</label>
                <input type="text" id="booked_amount" name="booked_amount" />
                <label for="actual_amount">Actual Amount</label>
                <input type="text" id="actual_amount" name="actual_amount" />
                <label for="adjustments">Adjustments</label>
                <input type="text" id="adjustments" name="adjustments" />
                <button type="submit">Create</button>
            </Form>
            {adsList}
        </div>
    );
}