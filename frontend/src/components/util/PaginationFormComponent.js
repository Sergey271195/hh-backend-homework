import React, { useState } from "react";

const BASE_URL = "http://localhost:8080";

const PaginationFormComponent = ({
    setReturnData,
    url,
    queryPlaceholder,
    showQuery = true,
    setError,
}) => {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState("");
    const [perPage, setPerPage] = useState("");

    const addedHandler = (event) => {
        event.preventDefault();
        const queryParams = prepareQuery();
        fetch(BASE_URL + url + queryParams)
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
                console.log(data);
                setReturnData(data);
            })
            .catch((error) => console.log(error.message));
    };

    const prepareQuery = () => {
        const requestQuery = query ? `?query=${query}` : "?query=";
        const pageQuery = page ? `&page=${page}` : "";
        const perPageQuery = perPage ? `&per_page=${perPage}` : "";
        return requestQuery + pageQuery + perPageQuery;
    };

    return (
        <div>
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={(event) => addedHandler(event)}
            >
                <h3>Form</h3>
                {showQuery && (
                    <input
                        style={{
                            fontSize: "15px",
                            padding: "10px",
                            marginBottom: "10px",
                        }}
                        type="text"
                        placeholder={queryPlaceholder}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                )}
                <input
                    style={{
                        fontSize: "15px",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                    type="number"
                    placeholder="Page number"
                    value={page}
                    onChange={(event) => setPage(event.target.value)}
                />
                <input
                    style={{
                        fontSize: "15px",
                        padding: "10px",
                        marginBottom: "10px",
                    }}
                    type="number"
                    placeholder="Per page number"
                    value={perPage}
                    onChange={(event) => setPerPage(event.target.value)}
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

export default PaginationFormComponent;
