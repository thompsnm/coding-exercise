import React, { useState, useEffect } from "react";
import logo from "../logo.svg";
import "../App.css";
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
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src={logo} alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
        <p style={{ color: "white" }}>{data}</p>
        <CampaignTable />
        <AdTable />
      </header>
    </div>
  );
}
export default Root;