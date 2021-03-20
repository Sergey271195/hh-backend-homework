import React, { useState } from "react";
import "../App.css";
import PaginationContextProvider from "./context/PaginationContext";
import SearchBarComponent from "./SearchBarComponent";

const HeaderComponent = () => {
    const [showSearchBar, setShowSearchBar] = useState(true);

    return (
        <>
            <div className="mainheader">
                <div className="headhunter_header">
                    <img className="headhunter_logo" src="/images/logo.png" />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            style={{ cursor: "pointer" }}
                            src="/images/search_icon.png"
                            onClick={() => setShowSearchBar(!showSearchBar)}
                        />
                        <label
                            style={{
                                color: "white",
                                marginLeft: "20px",
                                cursor: "pointer",
                            }}
                            onClick={() => setShowSearchBar(!showSearchBar)}
                        >
                            Поиск
                        </label>
                    </div>
                </div>
            </div>
            <PaginationContextProvider>
                {showSearchBar && <SearchBarComponent />}
            </PaginationContextProvider>
        </>
    );
};

export default HeaderComponent;
