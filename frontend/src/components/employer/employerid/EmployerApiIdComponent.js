import React, { useContext } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import EmployerIdItem from "./EmployerIdItem";

const EmployerApiIdComponent = () => {
    const { employer } = useContext(EmployerContext);

    return (
        <div>
            {employer?.employer &&
                employer.employer.map((emp) => (
                    <EmployerIdItem employer={emp} />
                ))}
        </div>
    );
};

export default EmployerApiIdComponent;
