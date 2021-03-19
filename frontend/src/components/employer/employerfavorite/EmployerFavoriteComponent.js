import React, { useContext } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import FavoriteEmployerItem from "./FavoriteEmployerItem";

const EmployerFavoriteComponent = () => {
    const { employer } = useContext(EmployerContext);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {employer?.employer &&
                employer.employer.map((emp) => (
                    <FavoriteEmployerItem employer={emp} />
                ))}
        </div>
    );
};

export default EmployerFavoriteComponent;
