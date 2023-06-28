import React, { useState, useEffect } from "react";
import SearchBar from "../components/search-bar.js";
import TransactionInfo from "../components/transaction-info.js";
import Header from "../components/header.js";

const web3 = require('@solana/web3.js');
const endpont = web3.clusterApiUrl("devnet");
const connection = new web3.Connection(endpont);

function TXDetails() {
    const [txHash, setTxHash] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [txData, setTxData] = useState(null);
    const [error, setError] = useState("");
    const [dataExist, setDataExist] = useState(false);
    const [currentTxHash, setCurrentTxHash] = useState("");

    const handleAddressChange = ({ target }) => {
        setTxHash(target.value);
    }

    const handleSearch = async () => {
        if (txHash) {
            try {
                setLoading(true);
                const tx = await connection.getParsedTransaction(txHash);
                if (tx) {
                    setCurrentTxHash(txHash);
                    setDataExist(true);
                    setTxData(tx);
                    console.log(`Retrieved transaction: ${tx}`);
                    setError("");
                } else {
                    const errorMessage = "Transaction doesn't exist or wasn't confirmed and finalized!";
                    console.log(errorMessage);
                    setError(errorMessage);
                    setTxData(null);
                    setDataExist(false);
                }
            } catch (error) {
                const errorMessage = "Failed to get transaction";
                console.log(`An error occurred while fetching TX data: ${error}`);
                setTxData(null);
                setError(errorMessage);
                setDataExist(false);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>
            <Header isWithData={dataExist} />
            <SearchBar txHash={txHash} onHashChange={handleAddressChange} onSearch={handleSearch} />
            {isLoading ? <p className="loading-message">Loading...</p> : (
                <>
                    {error && <p className="error-message">ERROR: {error.toString()}</p>}
                    {txData && <TransactionInfo txHash={currentTxHash} txObject={txData} />}
                </>
            )}
        </>
    );
}

export default TXDetails;