import React, { useContext, useEffect } from "react";
import { EmployerContext } from "../context/EmployerContext";
import { EnvironmentContext } from "../context/EnvironmentContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { PaginationContext } from "../context/PaginationContext";

const FetchFavoriteEmployerButton = () => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);
    const { pagination } = useContext(PaginationContext);
    const { globalInput } = useContext(GlobalInputContext);

    const handleFetch = () => {
        const requestQuery = `?page=${pagination.page}&per_page=${pagination.per_page}`;
        fetchFavoriteEmployers(requestQuery);
    };

    const handleFetchedData = (data) => {
        console.log("HERE");
        console.log(data);
        if (!globalInput.value) return data;
        return data.filter((employer) =>
            employer.name
                .toLowerCase()
                .includes(globalInput.value.toLowerCase())
        );
    };

    const fetchFavoriteEmployers = (requestQuery) => {
        fetch(environment.baseUrl + "/favorites/employer" + requestQuery)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                response
                    .json()
                    .then((error) =>
                        dispatchEmployer({ type: "SET_EMPLOYER", employer: [] })
                    );
                throw new Error();
            })
            .then((data) => {
                console.log(handleFetchedData(data));
                dispatchEmployer({
                    type: "SET_EMPLOYER",
                    employer: handleFetchedData(data),
                });
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        fetchFavoriteEmployers(`?page=&per_page=`);
    }, []);

    return (
        <button className="headhunter_button" onClick={handleFetch}>
            Найти
        </button>
    );
};

export default FetchFavoriteEmployerButton;
