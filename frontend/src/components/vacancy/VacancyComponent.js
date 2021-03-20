import React, { useContext } from "react";
import { VacancyViewContext } from "../context/VacancyViewContext";
import { VacancyContext } from "../context/VacancyContext";
import VacancyApiIdComponent from "./vacancyid/VacancyApiIdComponent";
import VacancyApiListComponent from "./vacancylist/VacancyApiListComponent";
import VacancyFavoriteComponent from "./vacancyfavorite/VacancyFavoriteComponent";

const VacancyComponent = () => {
    const { vacancyView } = useContext(VacancyViewContext);
    const { vacancy } = useContext(VacancyContext);

    const labelHandler = (len) => {
        if (len === 1) {
            return "Найдена 1 вакансия";
        } else if (len < 5) {
            return `Найдено ${len} вакансии`;
        }
        return `Найдено ${len} вакансий`;
    };

    return (
        <div
            style={{
                display: "flex",
                width: "60%",
                flexDirection: "column",
            }}
        >
            {vacancy?.vacancy && (
                <h2>
                    {vacancy.vacancy.length > 0
                        ? labelHandler(vacancy.vacancy.length)
                        : "По запросу ничего не найдено"}
                </h2>
            )}
            <div>
                {vacancyView.getListApi && <VacancyApiListComponent />}
                {vacancyView.getIdApi && <VacancyApiIdComponent />}
                {vacancyView.getFavoriteDb && <VacancyFavoriteComponent />}
            </div>
        </div>
    );
};

export default VacancyComponent;
