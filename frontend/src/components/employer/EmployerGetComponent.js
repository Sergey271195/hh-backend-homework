import React from "react";
import ErrorComponent from "../util/ErrorComponent";
import EmployerItem from "./EmployerItem";

const EmployerGetComponent = ({ employers, error }) => {
    return (
        <>
            <ErrorComponent error={error} />
            {employers &&
                employers.map((employer, index) => {
                    return (
                        <EmployerItem
                            key={employer.id}
                            index={index}
                            id={employer.id}
                            name={employer.name}
                        />
                    );
                })}
        </>
    );
};

export default EmployerGetComponent;
