import React, { useContext, useEffect } from "react";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { PaginationContext } from "../context/PaginationContext";
import { VacancyContext } from "../context/VacancyContext";

const FetchFavoriteVacancyButton = () => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchVacancy } = useContext(VacancyContext);
    const { pagination } = useContext(PaginationContext);
    const { globalInput } = useContext(GlobalInputContext);

    const handleFetch = () => {
        const requestQuery = `?page=${pagination.page}&per_page=${pagination.per_page}`;
        fetchFavoriteVacancies(requestQuery);
    };

    const handleFetchedData = (data) => {
        if (!globalInput.value) return data;
        return data.filter((vacancy) =>
            vacancy.name.toLowerCase().includes(globalInput.value.toLowerCase())
        );
    };

    const fetchFavoriteVacancies = (requestQuery) => {
        fetch(environment.baseUrl + "/favorites/vacancy" + requestQuery)
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
                dispatchVacancy({
                    type: "SET_VACANCY",
                    vacancy: handleFetchedData(data),
                });
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        fetchFavoriteVacancies(`?page=&per_page=`);
    }, []);

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchFavoriteVacancyButton;
