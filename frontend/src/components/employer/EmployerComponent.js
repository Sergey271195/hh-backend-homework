import React, { useContext } from "react";
import "../../App.css";
import { EmployerViewContext } from "../context/EmployerViewContext";
import EmployerApiListComponent from "./employerlist/EmployerApiListComponent";
import EmployerApiIdComponent from "./employerid/EmployerApiIdComponent";
import EmployerFavoriteComponent from "./employerfavorite/EmployerFavoriteComponent";
import { EmployerContext } from "../context/EmployerContext";

const EmployerCompnent = () => {
    const { employerView } = useContext(EmployerViewContext);
    const { employer } = useContext(EmployerContext);

    const labelHandler = (len) => {
        if (len === 1) {
            return "Найдена 1 компания";
        } else if (len < 5) {
            return `Найдено ${len} компании`;
        }
        return `Найдено ${len} компаний`;
    };

    return (
        <div
            style={{
                display: "flex",
                width: "60%",
                flexDirection: "column",
            }}
        >
            {employer?.employer && (
                <h2>
                    {employer.employer.length > 0
                        ? labelHandler(employer.employer.length)
                        : "По запросу ничего не найдено"}
                </h2>
            )}
            <div>
                {employerView.getListApi && <EmployerApiListComponent />}
                {employerView.getIdApi && <EmployerApiIdComponent />}
                {employerView.getFavoriteDb && <EmployerFavoriteComponent />}
            </div>
        </div>
    );
};

export default EmployerCompnent;
