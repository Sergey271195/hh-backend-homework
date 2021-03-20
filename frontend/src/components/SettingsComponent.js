import React, { useContext } from "react";
import { MainviewContext } from "./context/MainviewContext";
import "../App.css";
import EmployerSettingsComponent from "./EmployerSettingsComponent";
import VacancySettingsComponent from "./VacancySettingsComponent";

const SettingsComponent = () => {
    const { isEmployerView } = useContext(MainviewContext);

    return (
        <div className="settings_container">
            {isEmployerView && <EmployerSettingsComponent />}
            {!isEmployerView && <VacancySettingsComponent />}
        </div>
    );
};

export default SettingsComponent;
