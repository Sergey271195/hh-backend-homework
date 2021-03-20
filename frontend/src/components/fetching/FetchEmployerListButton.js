import React, { useContext } from "react";
import { EmployerContext } from "../context/EmployerContext";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { PaginationContext } from "../context/PaginationContext";

const FetchEmployerListButton = () => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);
    const { pagination } = useContext(PaginationContext);
    const { globalInput } = useContext(GlobalInputContext);

    const handleFetch = () => {
        const page = pagination.page;
        const per_page = pagination.per_page;
        const query = globalInput.value;
        const requestQuery = `?query=${query}&page=${page}&per_page=${per_page}`;
        fetchFavoriteEmployers(requestQuery);
    };

    const fetchFavoriteEmployers = (requestQuery) => {
        fetch(environment.baseUrl + `/employer` + requestQuery)
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
                console.log(data);
                dispatchEmployer({ type: "SET_EMPLOYER", employer: data });
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchEmployerListButton;
