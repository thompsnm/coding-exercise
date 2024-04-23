import React, { useState, useEffect } from "react";
import CampaignTable from "../components/campaignTable";
import AdTable from "../components/adTable";

function Root() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const body = await response.json();
        setData(body.message);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      <header>
        <h1>Campaigns</h1>
        <p>{data}</p>
      </header>
      <CampaignTable />
    </div>
  );
}
export default Root;