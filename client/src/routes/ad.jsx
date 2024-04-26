import React from "react";
import { useLoaderData, Form, useNavigate } from "react-router-dom";
import AdDetails from "../components/adDetails";

export async function loader({ params }) {
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

    function handleArchiveClick() {
        navigate(`/campaign/${adDetails.campaign_id}`);
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
                <input type="text" name="adjustments" defaultValue={adDetails.adjustments} />
                <button type="submit">Update</button>
            </Form>
        </div>
    );
}