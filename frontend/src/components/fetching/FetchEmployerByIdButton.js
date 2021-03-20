import React, { useContext } from "react";
import { EmployerContext } from "../context/EmployerContext";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { fetchEmployerById } from "./FecthFunctions";

const FetchEmployerByIdButton = () => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);
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
        fetchEmployerById(environment.baseUrl, globalInput.value).then((data) =>
            dispatchEmployer({ type: "SET_EMPLOYER", employer: data })
        );
    };

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchEmployerByIdButton;
