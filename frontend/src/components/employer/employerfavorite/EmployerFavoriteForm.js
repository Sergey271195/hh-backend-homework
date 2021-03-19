import React, { useContext, useEffect, useState } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import "../../../App.css";

const EmployerFavoriteForm = () => {
    const [pagination, setPagination] = useState({ page: "", perPage: "" });
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);

    const requestIsValid = (page, perPage) => {
        return page >= 0 && perPage >= 0 && perPage < 100;
    };

    const onSubmitHanlder = (event) => {
        event.preventDefault();
        const queryPage = pagination.page ? pagination.page : 0;
        const queryPerPage = pagination.perPage ? pagination.perPage : 20;
        if (!requestIsValid(queryPage, queryPerPage)) {
            alert("Invalid request parameters");
            return;
        }
        fetchFavoriteEmployers(queryPage, queryPerPage);
    };

    const fetchFavoriteEmployers = (page, perPage) => {
        fetch(
            environment.baseUrl +
                `/favorites/employer?page=${page}&per_page=${perPage}`
        )
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
                dispatchEmployer({ type: "SET_EMPLOYER", employer: data });
            })
            .catch((error) => console.log(error.message));
    };

    useEffect(() => {
        fetchFavoriteEmployers(0, 20);
    }, []);
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
                    placeholder="Page number"
                    value={pagination.page}
                    onChange={(event) =>
                        setPagination({
                            ...pagination,
                            page: event.target.value,
                        })
                    }
                />
                <input
                    className="formInput"
                    type="number"
                    placeholder="Per page number"
                    value={pagination.perPage}
                    onChange={(event) =>
                        setPagination({
                            ...pagination,
                            perPage: event.target.value,
                        })
                    }
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

export default EmployerFavoriteForm;
