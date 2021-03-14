import React, { useState } from "react";

const BASE_URL = "http://localhost:8080";

const IdFormComponent = ({
    setReturnData,
    urlWithId,
    placeholder,
    setError,
}) => {
    const [id, setId] = useState("");

    const addedHandler = (event) => {
        event.preventDefault();
        if (!id || id < 0) return;
        const urlWithInjectedId = urlWithId.replace("{id}", id);
        fetch(BASE_URL + urlWithInjectedId)
            .then((response) => {
                if (response.ok) {
                    setError();
                    return response.json();
                } else {
                    response.json().then(setError);
                    throw new Error();
                }
            })
            .then((data) => {
                setReturnData([data]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(event) => addedHandler(event)}
            >
                <h3>Form</h3>
                <input
                    style={{
                        fontSize: "15px",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                    type="number"
                    placeholder={placeholder}
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                />
                <button
                    style={{ fontSize: "15px", padding: "10px" }}
                    type="submit"
                >
                    Get
                </button>
                <br />
            </form>
        </div>
    );
};

export default IdFormComponent;
