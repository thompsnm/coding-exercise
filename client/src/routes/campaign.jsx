import React, { useState } from "react";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import AdsList from "../components/adsList";
import CampaignDetails from "../components/campaignDetails";

export async function loader({ params }) {
    if(window.Cypress) {
        // If Cypress is running a test, tell it that it can stop waiting
        window.cypress_wait = false;
    }

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

    return data;
}

export async function action({ params, request }) {
    if(window.Cypress) {
        // If Cypress is running a test, tell it that it needs to wait
        window.cypress_wait = true;
    }

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
    const navigate = useNavigate();

    function handleArchiveClick(campaignId) {
        return async function() {
            if(window.Cypress) {
                // If Cypress is running a test, tell it that it needs to wait
                window.cypress_wait = true;
            }

            const response = await fetch(
                `/api/campaign/${campaignId}`,
                {
                    method: "DELETE",
                },
            );

            if (response.ok) {
                navigate(`/`);
            }
        }
    }

    let adsList = adsFound
        ? <AdsList ads={ ads } />
        : <p>No ads found for this campaign!</p>
    
    let details = detailsFound
        ? <div>
            <CampaignDetails campaignDetails={ campaignDetails } />
            <p>Create new Ad:</p>
            <Form method="put" action={`/campaign/${campaignId}`}>
                <label htmlFor="new_ad_name">Ad Name</label>
                <input type="text" id="new_ad_name" name="name" />
                <label htmlFor="new_ad_booked_amount">Booked Amount</label>
                <input type="text" id="new_ad_booked_amount" name="booked_amount" />
                <label htmlFor="new_ad_actual_amount">Actual Amount</label>
                <input type="text" id="new_ad_actual_amount" name="actual_amount" />
                <label htmlFor="new_ad_adjustments">Adjustments</label>
                <input type="text" id="new_ad_adjustments" name="adjustments" />
                <button type="submit">Create</button>
            </Form>
        </div>
        : <p>No details found for this campaign!</p>

    return (
        <div>
            <header>
                <h1>Campaign Details</h1>
            </header>
            {details}
            {adsList}
            <br />
            <button type="button" onClick={handleArchiveClick(campaignId)}>Archive Campaign</button>
        </div>
    );
}