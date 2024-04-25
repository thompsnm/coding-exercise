import React from "react";
import { useLoaderData } from "react-router-dom";
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

export default function Ad() {
    const { detailsFound, adDetails } = useLoaderData();

    let details = detailsFound
        ? <AdDetails adDetails={ adDetails } />
        : <p>No details found for this ad!</p>

    return (
        <div>
            <header>
                <h1>Ad Details</h1>
            </header>
            {details}
        </div>
    );
}