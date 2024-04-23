import React, { useState, useEffect } from "react";
import AdTable from "../components/adTable";

function Campaign() {
    return (
        <div>
            <header>
                <h1>Campaign {Campaign.id}</h1>
            </header>
            <AdTable />
        </div>
    );
}
export default Campaign;