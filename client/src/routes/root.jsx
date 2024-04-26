import React, { useState } from "react";
import { useLoaderData, Link, Form, useNavigate } from "react-router-dom";

export async function loader() {
  let data = [];

  const response = await fetch("/api/campaigns");
  if (response.ok) {
    data = await response.json();
  }

  if(window.Cypress) {
    // If Cypress is running a test, tell it that it can stop waiting
    window.cypress_wait = false;
  }

  return data;
}

export async function action({ params, request }) {
    if(window.Cypress) {
        // If Cypress is running a test, tell it that it needs to wait
        window.cypress_wait = true;
    }

    // In theory FormData should be able to be sent to the server url-encoded.
    // However, I was having trouble getting my Express server to properly
    // decode it from that content type. I worked around the issue by
    // decoding the formData client side into JSON, stingifying that, and
    // sending that over the wire.
    let formData = Object.fromEntries(await request.formData());
    const data = [];

    const response = await fetch(
        `/api/campaigns`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: request.method,
            body: JSON.stringify(formData),
        },
    );

    if (response.ok) {
        data.detailsFound = true;
        data.adDetails = await response.json();
    }

    return data;
}

export default function Root() {
  let campaigns = useLoaderData();
  const navigate = useNavigate();

  function handleArchiveClick(campaignId) {
    return async function() {
      const response = await fetch(
        `/api/campaign/${campaignId}`,
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
      <header>
        <h1>Campaigns</h1>
      </header>
      <p>Create new Campaign:</p>
      <Form method="put" action={"/"}>
        <label htmlFor="new_campaign_name">Campaign Name</label>
        <input type="text" id="new_campaign_name" name="name" />
        <button type="submit">Create</button>
      </Form>
      <p>Existing Campaigns:</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details Page</th>
            <th>Invoice Page</th>
            <th>Archive Button</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => {
            return (
              <tr key={campaign.id}>
                <td>{campaign.id}</td>
                <td>{campaign.name}</td>
                <td>
                  <Link to={`campaign/${campaign.id}`}>Details</Link>
                </td>
                <td>
                  <Link to={`campaign/${campaign.id}/invoice`}>Invoice</Link>
                </td>
                <td>
                  <button type="button" onClick={handleArchiveClick(campaign.id)}>Archive</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}