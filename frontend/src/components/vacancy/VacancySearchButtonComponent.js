import React, { useContext } from "react";
import { VacancyViewContext } from "../context/VacancyViewContext";
import FetchFavoriteVacancyButton from "../fetching/FetchFavoriteVacancyButton";
import FetchVacancyByIdButton from "../fetching/FetchVacancyByIdButton";
import FetchVacancyListButton from "../fetching/FetchVacancyListButton";

const VacancySearchButtonComponent = () => {
    const { vacancyView } = useContext(VacancyViewContext);

    if (vacancyView.getListApi) return <FetchVacancyListButton />;
    if (vacancyView.getIdApi) return <FetchVacancyByIdButton />;
    else return <FetchFavoriteVacancyButton />;
};

export default VacancySearchButtonComponent;
