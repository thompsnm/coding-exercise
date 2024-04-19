import React, { useState, useEffect } from "react";

function CampaignTable() {
    let [campaignList, setCampaignList] = useState([]);

    useEffect(async () => {
        try {
            const response = await fetch("/campaigns");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const body = await response.json();
            setCampaignList(body);
            console.log("done with API request");
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    return (
        <div>
            <p>Campaigns</p>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                {campaignList.map((campaign) => {
                    return (
                        <tr>
                            <td>{campaign.id}</td>
                            <td>{campaign.name}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
    //return (
        //<div>{{campaignList}}</div>
    //);
}

export default CampaignTable;