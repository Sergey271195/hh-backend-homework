import React, { useContext } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import EmployerListItem from "./EmployerListItem";

const EmployerApiListComponent = () => {
    const { employer } = useContext(EmployerContext);

    return (
        <div>
            {employer?.employer &&
                employer.employer.map((emp) => (
                    <EmployerListItem employer={emp} />
                ))}
        </div>
    );
};

export default EmployerApiListComponent;
