import React from "react";

const EmployerItem = ({ index, id, name }) => {
    return (
        <div
            style={{
                borderBottom: "1px solid black",
                width: "80%",
                marginBottom: "10px",
                padding: "5px",
                paddingBottom: "10px",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    padding: "5px",
                    fontSize: "20px",
                }}
            >
                Employer: {index + 1}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>employer_id</b>: {id}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>employer_name</b>: {name}
            </div>
        </div>
    );
};

export default EmployerItem;
