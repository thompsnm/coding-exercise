import React, { useState, useEffect } from "react";

function AdTable() {
    let [adList, setAdList] = useState([]);

    useEffect(async () => {
        try {
            const response = await fetch("/ads");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const body = await response.json();
            setAdList(body);
            console.log("done with API request");
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    return (
        <div>
            <p>Ads</p>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Booked Amount</th>
                    <th>Actual Amount</th>
                    <th>Adjustments</th>
                </tr>
                {adList.map((ad) => {
                    return (
                        <tr>
                            <td>{ad.id}</td>
                            <td>{ad.name}</td>
                            <td>{ad.booked_amount}</td>
                            <td>{ad.actual_amount}</td>
                            <td>{ad.adjustments}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default AdTable;