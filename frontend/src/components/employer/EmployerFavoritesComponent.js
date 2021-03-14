import React from "react";
import ErrorComponent from "../util/ErrorComponent";
import EmployerFavoriteItem from "./EmployerFavoriteItem";

const BASE_URL = "http://localhost:8080";

const EmployerFavoritesComponent = ({ employers, error }) => {
    const deleteEmployer = (employerId) => {
        if (!employerId) return;
        fetch(BASE_URL + "/favorites/employer/" + employerId, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    employers = employers.filter(
                        (employers) => employers.id !== employerId
                    );
                }
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <>
            <ErrorComponent error={error} />
            {employers &&
                employers.map((employer, index) => {
                    return (
                        <EmployerFavoriteItem
                            deleteEmployer={deleteEmployer}
                            key={employer.id}
                            index={index}
                            employer={employer}
                        />
                    );
                })}
        </>
    );
};

export default EmployerFavoritesComponent;
