import React, { useContext } from "react";
import { EmployerViewContext } from "../context/EmployerViewContext";
import FetchEmployerListButton from "../fetching/FetchEmployerListButton";
import FetchEmployerByIdButton from "../fetching/FetchEmployerByIdButton";
import FetchFavoriteEmployerButton from "../fetching/FetchFavoriteEmployerButton";

const EmployerSearchButtonComponent = () => {
    const { employerView } = useContext(EmployerViewContext);

    if (employerView.getListApi) return <FetchEmployerListButton />;
    if (employerView.getIdApi) return <FetchEmployerByIdButton />;
    else return <FetchFavoriteEmployerButton />;
};

export default EmployerSearchButtonComponent;
