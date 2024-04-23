import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  try {
    const response = await fetch("/api/campaigns");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export default function Root() {
  let [campaigns, setCampaigns] = useState(useLoaderData());

  return (
    <div>
      <header>
        <h1>Campaigns</h1>
      </header>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => {
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
}