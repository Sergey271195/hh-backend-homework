import React, { useContext } from "react";
import { EmployerContext } from "../context/EmployerContext";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";

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
        fetchEmployerById(globalInput.value);
    };

    const fetchEmployerById = (id) => {
        fetch(environment.baseUrl + `/employer/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                response
                    .json()
                    .then((error) =>
                        dispatchEmployer({ type: "ERROR", error: error })
                    );
                throw new Error();
            })
            .then((data) => {
                dispatchEmployer({ type: "SET_EMPLOYER", employer: [data] });
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchEmployerByIdButton;
