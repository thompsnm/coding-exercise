import React, { useState, useEffect } from "react";

function CampaignTable() {
    let [campaignList, setCampaignList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/campaigns");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const body = await response.json();
                setCampaignList(body);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <p>Campaigns</p>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {campaignList.map((campaign) => {
                        return (
                            <tr key={campaign.id}>
                                <td>{campaign.id}</td>
                                <td>{campaign.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
    //return (
        //<div>{{campaignList}}</div>
    //);
}

export default CampaignTable;