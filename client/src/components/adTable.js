import React, { useState, useEffect } from "react";

function AdTable() {
    let [adList, setAdList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/ads");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const body = await response.json();
                setAdList(body);
                console.log("done with API request");
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

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
                    {adList.map((ad) => {
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

export default AdTable;