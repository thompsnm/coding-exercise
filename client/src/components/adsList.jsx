import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AdsList({ ads }) {
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}