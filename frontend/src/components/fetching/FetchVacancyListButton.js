import React, { useContext } from "react";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { PaginationContext } from "../context/PaginationContext";
import { VacancyContext } from "../context/VacancyContext";

const FetchVacancyListButton = () => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchVacancy } = useContext(VacancyContext);
    const { pagination } = useContext(PaginationContext);
    const { globalInput } = useContext(GlobalInputContext);

    const handleFetch = () => {
        const page = pagination.page;
        const per_page = pagination.per_page;
        const query = globalInput.value;
        const requestQuery = `?query=${query}&page=${page}&per_page=${per_page}`;
        fetchFavoriteVacancy(requestQuery);
    };

    const fetchFavoriteVacancy = (requestQuery) => {
        fetch(environment.baseUrl + `/vacancy` + requestQuery)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                response
                    .json()
                    .then((error) =>
                        dispatchVacancy({ type: "SET_VACANCY", vacancy: [] })
                    );
                throw new Error();
            })
            .then((data) => {
                dispatchVacancy({ type: "SET_VACANCY", vacancy: data });
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchVacancyListButton;
