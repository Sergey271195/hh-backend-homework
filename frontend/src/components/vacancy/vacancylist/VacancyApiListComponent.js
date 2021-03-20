import React, { useContext } from "react";
import { VacancyContext } from "../../context/VacancyContext";
import VacancyListItem from "./VacancyListItem";

const VacancyApiListComponent = () => {
    const { vacancy } = useContext(VacancyContext);

    return (
        <div>
            {vacancy?.vacancy &&
                vacancy.vacancy.map((vac) => <VacancyListItem vacancy={vac} />)}
        </div>
    );
};

export default VacancyApiListComponent;
