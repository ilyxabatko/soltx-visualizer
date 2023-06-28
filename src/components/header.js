import React from "react";
import logo from "../logo.svg";

function Header({ isWithData }) {
    return (
        <div className={isWithData ? "header-container-data" : "header-container"}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="header-h1">Explore Solana Transactions</h1>
        </div>
    )
}

export default Header;