import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    try {
        const response = await fetch(`/api/ads?campaign_id=${params.campaignId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const body = await response.json();
        return {
            campaignId: params.campaignId,
            initialAds: body,
        };
    } catch (error) {
        console.error(error.message);
        return {
            campaignId: params.campaignId,
            initialAds: [],
        };
    }
}

export default function Campaign() {
    const { campaignId, initialAds } = useLoaderData();
    let [ads, setAds] = useState(initialAds);

    return (
        <div>
            <header>
                <h1>Campaign {campaignId}</h1>
            </header>
            <p>Ads</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Booked Amount</th>
                        <th>Actual Amount</th>
                        <th>Adjustments</th>
                    </tr>
                </thead>
                <tbody>
                    {ads.map((ad) => {
                        return (
                            <tr key={ad.id}>
                                <td>{ad.id}</td>
                                <td>{ad.name}</td>
                                <td>{ad.booked_amount}</td>
                                <td>{ad.actual_amount}</td>
                                <td>{ad.adjustments}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}