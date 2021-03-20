import React, { useContext } from "react";
import { VacancyContext } from "../../context/VacancyContext";
import FavoriteVacancyItem from "./FavoriteVacancyItem";

const VacancyFavoriteComponent = () => {
    const { vacancy } = useContext(VacancyContext);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {vacancy?.vacancy &&
                vacancy.vacancy.map((vac) => (
                    <FavoriteVacancyItem vacancy={vac} />
                ))}
        </div>
    );
};

export default VacancyFavoriteComponent;
