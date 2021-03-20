import React, { useContext } from "react";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { VacancyContext } from "../context/VacancyContext";
import { fetchVacancyById } from "./FecthFunctions";

const FetchVacancyByIdButton = () => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchVacancy } = useContext(VacancyContext);
    const { globalInput } = useContext(GlobalInputContext);

    const handleFetch = () => {
        if (
            !globalInput.value ||
            isNaN(globalInput.value) ||
            globalInput.value < 0
        ) {
            alert("Неверно указанный идентификатор");
            return;
        }
        fetchVacancyById(environment.baseUrl, globalInput.value).then((data) =>
            dispatchVacancy({ type: "SET_VACANCY", vacancy: data })
        );
    };

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchVacancyByIdButton;
