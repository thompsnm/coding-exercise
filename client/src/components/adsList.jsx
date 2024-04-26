import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdsList({ ads }) {
    const navigate = useNavigate();

    function handleArchiveClick(adId) {
        return async function() {
            if(window.Cypress) {
                // If Cypress is running a test, tell it that it needs to wait
                window.cypress_wait = true;
            }

            const response = await fetch(
                `/api/ad/${adId}`,
                {
                    method: "DELETE",
                },
            );

            if (response.ok) {
                navigate("");
            }
        }
    }

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
                        <th>Details Page</th>
                        <th>Archive Button</th>
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
                                <td>
                                    <Link to={`/ad/${ad.id}`}>Details</Link>
                                </td>
                                <td>
                                    <button type="button" onClick={handleArchiveClick(ad.id)}>Archive</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}