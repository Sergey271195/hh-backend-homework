import React, { useContext } from "react";
import { VacancyViewContext } from "../../context/VacancyViewContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import { VacancyContext } from "../../context/VacancyContext";
import {
    fetchEmployerById,
    fetchVacancyById,
} from "../../fetching/FecthFunctions";
import { EmployerContext } from "../../context/EmployerContext";
import { EmployerViewContext } from "../../context/EmployerViewContext";
import { MainviewContext } from "../../context/MainviewContext";

const VacancyListItem = ({
    vacancy: {
        id,
        name,
        area: { id: areaId, name: areaName },
        employer: { id: employerId, name: employerName },
        created_at,
        salary,
    },
}) => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchVacancy } = useContext(VacancyContext);
    const { dispatchVacancyView } = useContext(VacancyViewContext);
    const { dispatchEmployer } = useContext(EmployerContext);
    const { setEmployerView } = useContext(EmployerViewContext);
    const { setIsEmployerView } = useContext(MainviewContext);

    const handleEmployerClick = () => {
        dispatchEmployer({ type: "CLEAR" });
        fetchEmployerById(environment.baseUrl, employerId).then((data) =>
            dispatchEmployer({ type: "SET_EMPLOYER", employer: data })
        );
        setEmployerView({ type: "GET_ID" });
        setIsEmployerView(true);
    };

    const handleClick = () => {
        dispatchVacancy({ type: "CLEAR" });
        fetchVacancyById(environment.baseUrl, id).then((data) =>
            dispatchVacancy({ type: "SET_VACANCY", vacancy: data })
        );
        dispatchVacancyView({ type: "GET_ID" });
    };

    return (
        <div className="itemcontainer">
            <div className="link">{name}</div>
            <div
                className="area"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div className="employer_link" onClick={handleEmployerClick}>
                    {employerName}
                </div>
                <div className="salary">
                    {salary?.from ? " от " + salary.from : ""}{" "}
                    {salary?.to ? " до " + salary.to : ""} {salary?.currency}
                </div>
            </div>
            <div className="area">{areaName}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="item_button" onClick={handleClick}>
                    Подробнее
                </button>
                <div className="area">{created_at}</div>
            </div>
        </div>
    );
};

export default VacancyListItem;
