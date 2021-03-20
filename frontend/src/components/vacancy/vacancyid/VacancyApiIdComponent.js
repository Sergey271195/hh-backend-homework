import React, { useContext } from "react";
import VacancyIdItem from "./VacancyIdItem";
import { VacancyContext } from "../../context/VacancyContext";

const VacancyApiIdComponent = () => {
    const { vacancy } = useContext(VacancyContext);
    return (
        <div>
            {vacancy.vacancy.length === 1 &&
                vacancy?.vacancy &&
                vacancy.vacancy.map((emp) => <VacancyIdItem vacancy={emp} />)}
        </div>
    );
};

export default VacancyApiIdComponent;
