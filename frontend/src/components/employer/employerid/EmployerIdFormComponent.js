import React, { useContext, useState } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import "../../../App.css";

const EmployerIdFormComponent = () => {
    const [id, setId] = useState("");
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);

    const requestIsValid = () => {
        return id && id > 0;
    };

    const onSubmitHanlder = (event) => {
        event.preventDefault();
        if (!requestIsValid()) {
            alert("Invalid request parameters");
            return;
        }
        fetchEmployerById(id);
    };

    const fetchEmployerById = (id) => {
        fetch(environment.baseUrl + `/employer/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                response
                    .json()
                    .then((error) =>
                        dispatchEmployer({ type: "ERROR", error: error })
                    );
                throw new Error();
            })
            .then((data) => {
                dispatchEmployer({ type: "SET_EMPLOYER", employer: [data] });
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(event) => onSubmitHanlder(event)}
            >
                <h3>Form</h3>
                <input
                    className="formInput"
                    type="number"
                    placeholder="Per page number"
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

export default EmployerIdFormComponent;
