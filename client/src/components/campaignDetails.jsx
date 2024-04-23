import React, { useState, useEffect } from "react";

export default function CampaignDetails({ initialAds }) {
    let [ads, setAds] = useState(initialAds);

    return (
        <div>
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