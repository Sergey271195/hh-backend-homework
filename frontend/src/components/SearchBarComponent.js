import React, { useContext, useState } from "react";
import { MainviewContext } from "./context/MainviewContext";
import "../App.css";
import { GlobalInputContext } from "./context/GlobalInputContext";
import SettingsComponent from "./SettingsComponent";
import { PaginationContext } from "./context/PaginationContext";
import EmployerSearchButtonComponent from "./employer/EmployerSearchButtonComponent";
import VacancySearchButtonComponent from "./vacancy/VacancySearchButtonComponent";

const SearchBarComponent = () => {
    const { isEmployerView, setIsEmployerView } = useContext(MainviewContext);
    const { globalInput, dispatchGlobalInput } = useContext(GlobalInputContext);
    const { dispatchPagination } = useContext(PaginationContext);

    const [showSettings, setShowSettings] = useState(false);

    const handleEmployerSwitch = () => {
        if (!isEmployerView) {
            setIsEmployerView(true);
            dispatchGlobalInput({ type: "CLEAR" });
            dispatchPagination({ type: "CLEAR" });
        }
    };

    const handleVacancySwitch = () => {
        if (isEmployerView) {
            setIsEmployerView(false);
            dispatchGlobalInput({ type: "CLEAR" });
            dispatchPagination({ type: "CLEAR" });
        }
    };

    return (
        <div className="searchbar">
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    width: "60%",
                    marginBottom: "10px",
                }}
            >
                <input
                    className="headhunter_input"
                    type="text"
                    value={globalInput.value}
                    onChange={(event) =>
                        dispatchGlobalInput({
                            type: "SET_VALUE",
                            value: event.target.value,
                        })
                    }
                />
                <button
                    className="settings_button"
                    onClick={() => setShowSettings(!showSettings)}
                >
                    <img
                        style={{ height: "25px" }}
                        src="/images/settings_icon.png"
                    />
                </button>
                {isEmployerView ? (
                    <EmployerSearchButtonComponent />
                ) : (
                    <VacancySearchButtonComponent />
                )}
            </div>
            {showSettings && <SettingsComponent />}
            <div style={{ display: "flex", width: "60%", marginTop: "auto" }}>
                <button
                    className={
                        "switchbutton" + (isEmployerView ? " active" : "")
                    }
                    style={{ marginRight: "50px" }}
                    onClick={handleEmployerSwitch}
                >
                    Компании
                </button>
                <button
                    className={
                        "switchbutton" + (!isEmployerView ? " active" : "")
                    }
                    onClick={handleVacancySwitch}
                >
                    Вакансии
                </button>
            </div>
        </div>
    );
};

export default SearchBarComponent;
