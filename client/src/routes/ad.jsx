import React from "react";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import AdDetails from "../components/adDetails";

export async function loader({ params }) {
    if(window.Cypress) {
        // If Cypress is running a test, tell it that it can stop waiting
        window.cypress_wait = false;
    }

    const data = {
        detailsFound: false,
        adDetails: {},
    };

    const detailsResponse = await fetch(`/api/ad/${params.adId}`);
    if (detailsResponse.ok) {
        data.detailsFound = true;
        data.adDetails = await detailsResponse.json();
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
    const adData = {
        detailsFound: false,
        adDetails: {},
    };

    const response = await fetch(
        `/api/ad/${params.adId}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: request.method,
            body: JSON.stringify(formData),
        },
    );

    if (response.ok) {
        adData.detailsFound = true;
        adData.adDetails = await response.json();
    }

    return adData;
}

export default function Ad() {
    const { detailsFound, adDetails } = useLoaderData();
    const navigate = useNavigate();

    function handleArchiveClick(adId, campaignId) {
        return async function() {
            const response = await fetch(
                `/api/ad/${adId}`,
                {
                    method: "DELETE",
                },
            );

            if (response.ok) {
                navigate(`/campaign/${campaignId}`);
            }
        }
    }

    let details = detailsFound
        ? <AdDetails adDetails={ adDetails } />
        : <p>No details found for this ad!</p>

    return (
        <div>
            <header>
                <h1>Ad Details</h1>
            </header>
            {details}
            <p>Update Adjustment:</p>
            <Form method="post" action={`/ad/${adDetails.id}`}>
                <input type="text" id="new_adjustment" name="adjustments" defaultValue={adDetails.adjustments} />
                <button type="submit">Update</button>
            </Form>
            <br />
            <button type="button" onClick={handleArchiveClick(adDetails.id, adDetails.campaign_id)}>Archive Ad</button>
        </div>
    );
}