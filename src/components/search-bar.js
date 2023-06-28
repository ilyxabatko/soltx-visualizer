import React from "react";

function SearchBar({ txHash, onHashChange, onSearch }) {
    return (
        <>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    value={txHash}
                    onChange={onHashChange}
                    placeholder="Enter transaction ID"
                />
                <button className="search-button" onClick={onSearch}>Search</button>
            </div>
        </>
    )
}

export default SearchBar;