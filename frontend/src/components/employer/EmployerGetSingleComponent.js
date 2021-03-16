import React, { useState } from "react";
import ErrorComponent from "../util/ErrorComponent";

const BASE_URL = "/api";

const EmployerGetSingleComponent = ({ employers, error }) => {
    const [comment, setComment] = useState("");

    const onSubmitHandle = (event) => {
        event.preventDefault();
        const employerId = employers[0].id;
        if (!employerId) return;
        fetch(BASE_URL + "/favorites/employer", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `comment=${comment}&employer_id=${employerId}`,
        }).catch((error) => console.log(error.message));
    };

    return (
        <>
            <ErrorComponent error={error} />
            {employers &&
                employers.map((employer) => {
                    return (
                        <div
                            key={employer.id}
                            style={{
                                width: "80%",
                                marginBottom: "10px",
                                padding: "5px",
                            }}
                        >
                            <form onSubmit={(event) => onSubmitHandle(event)}>
                                <input
                                    style={{
                                        marginLeft: "20px",
                                        marginRight: "20px",
                                        fontSize: "15px",
                                        padding: "10px",
                                        marginBottom: "10px",
                                    }}
                                    type="text"
                                    placeholder="comment"
                                    value={comment}
                                    onChange={(event) =>
                                        setComment(event.target.value)
                                    }
                                />
                                <button
                                    style={{
                                        fontSize: "15px",
                                        padding: "10px",
                                    }}
                                >
                                    Add employer
                                </button>
                            </form>
                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "5px",
                                    fontSize: "20px",
                                }}
                            ></div>
                            <div style={{ marginLeft: "20px" }}>
                                <b>employer_id</b>: {employer.id}
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <b>employer_name</b>: {employer.name}
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <b>description</b>: {employer.description}
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <b>area_id</b>: {employer.area.id}
                            </div>
                            <div style={{ marginLeft: "20px" }}>
                                <b>area_name</b>: {employer.area.name}
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

export default EmployerGetSingleComponent;
