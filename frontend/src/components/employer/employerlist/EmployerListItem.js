import React, { useContext } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import { EmployerViewContext } from "../../context/EmployerViewContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import { fetchEmployerById } from "../../fetching/FecthFunctions";

const EmployerListItem = ({ employer: { id, name } }) => {
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);
    const { setEmployerView } = useContext(EmployerViewContext);

    const handleClick = () => {
        dispatchEmployer({ type: "CLEAR" });
        fetchEmployerById(environment.baseUrl, id).then((data) =>
            dispatchEmployer({ type: "SET_EMPLOYER", employer: data })
        );
        setEmployerView({ type: "GET_ID" });
    };

    return (
        <div className="itemcontainer">
            <div className="link">{name}</div>
            <div>Много значимой информации...</div>
            <button className="item_button" onClick={handleClick}>
                Подробнее
            </button>
        </div>
    );
};

export default EmployerListItem;
