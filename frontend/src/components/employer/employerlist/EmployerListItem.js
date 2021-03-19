import React from "react";

const EmployerListItem = ({ employer: { id, name } }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Id: {id}</div>
            <div>Наименование компании: {name}</div>
        </div>
    );
};

export default EmployerListItem;
