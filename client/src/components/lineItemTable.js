import React, { useState, useEffect } from "react";

function LineItemTable() {
    let [lineItemList, setLineItemList] = useState([]);

    useEffect(async () => {
        try {
            const response = await fetch("/lineItems");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const body = await response.json();
            setLineItemList(body);
            console.log("done with API request");
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    return (
        <div>
            <p>Line Items</p>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Booked Amount</th>
                    <th>Actual Amount</th>
                    <th>Adjustments</th>
                </tr>
                {lineItemList.map((lineItem) => {
                    return (
                        <tr>
                            <td>{lineItem.id}</td>
                            <td>{lineItem.name}</td>
                            <td>{lineItem.booked_amount}</td>
                            <td>{lineItem.actual_amount}</td>
                            <td>{lineItem.adjustments}</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default LineItemTable;