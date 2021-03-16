import React, { useState } from "react";
import PaginationFormComponent from "../util/PaginationFormComponent";
import "../../App.css";
import EmployerGetComponent from "./EmployerGetComponent";
import EmployerFavoritesComponent from "./EmployerFavoritesComponent";
import IdFormComponent from "../util/IdFormComponent";
import EmployerGetSingleComponent from "./EmployerGetSingleComponent";

const BASE_URL = "/api";

const EmployerCompnent = () => {
    const [get, setGet] = useState(true);
    const [getById, setGetById] = useState(false);
    const [getFavorites, setGetFavorites] = useState(false);

    const [employers, setEmployers] = useState();
    const [error, setError] = useState();

    const chooseGet = () => {
        if (get) return;
        setEmployers();
        setGet(true);
        setGetById(false);
        setGetFavorites(false);
    };

    const chooseGetById = () => {
        if (getById) return;
        setEmployers();
        setGet(false);
        setGetById(true);
        setGetFavorites(false);
    };

    const chooseGetFavorites = () => {
        if (getFavorites) return;
        setEmployers();
        setGet(false);
        setGetById(false);
        setGetFavorites(true);
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <button className="subsectionbutton" onClick={chooseGet}>
                    GET
                </button>
                <button onClick={chooseGetById} className="subsectionbutton">
                    GET BY ID
                </button>
                <button
                    onClick={chooseGetFavorites}
                    className="subsectionbutton"
                >
                    GET FAVORITES
                </button>
                {get && (
                    <PaginationFormComponent
                        url="/employer"
                        setReturnData={setEmployers}
                        setError={setError}
                        queryPlaceholder="Search employer"
                    />
                )}
                {getById && (
                    <IdFormComponent
                        urlWithId="/employer/{id}"
                        setReturnData={setEmployers}
                        setError={setError}
                        placeholder="Employer id"
                    />
                )}
                {getFavorites && (
                    <PaginationFormComponent
                        showQuery={false}
                        url="/favorites/employer"
                        setReturnData={setEmployers}
                        setError={setError}
                        queryPlaceholder="Search favorite employer"
                    />
                )}
            </div>
            <div className="viewercontainer">
                <h2>View window</h2>
                <div className="viewer">
                    {get && (
                        <EmployerGetComponent
                            employers={employers}
                            error={error}
                        />
                    )}
                    {getById && (
                        <EmployerGetSingleComponent
                            employers={employers}
                            error={error}
                        />
                    )}
                    {getFavorites && (
                        <EmployerFavoritesComponent
                            employers={employers}
                            error={error}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default EmployerCompnent;
