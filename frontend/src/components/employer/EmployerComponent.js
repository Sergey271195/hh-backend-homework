import React, { useContext } from "react";
import "../../App.css";
import { EmployerViewContext } from "../context/EmployerViewContext";
import EmployerApiListComponent from "./employerlist/EmployerApiListComponent";
import EmployerApiIdComponent from "./employerid/EmployerApiIdComponent";
import EmployerFavoriteComponent from "./employerfavorite/EmployerFavoriteComponent";
import EmployerFavoriteForm from "./employerfavorite/EmployerFavoriteForm";
import EmployerListFormComponent from "./employerlist/EmployerListFormComponent";
import EmployerIdFormComponent from "./employerid/EmployerIdFormComponent";
import { EmployerContext } from "../context/EmployerContext";

const EmployerCompnent = () => {
    const { employerView, setEmployerView } = useContext(EmployerViewContext);
    const { dispatchEmployer } = useContext(EmployerContext);

    const setGetFavorite = () => {
        if (employerView.getFavoriteDb) return;
        setEmployerView({ type: "GET_FAVORITE" });
        dispatchEmployer({ type: "CLEAR" });
    };

    const setGetById = () => {
        if (employerView.getIdApi) return;
        setEmployerView({ type: "GET_ID" });
        dispatchEmployer({ type: "CLEAR" });
    };

    const setGetList = () => {
        if (employerView.getListApi) return;
        setEmployerView({ type: "GET_LIST" });
        dispatchEmployer({ type: "CLEAR" });
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "space-around",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <button className="subsectionbutton" onClick={setGetList}>
                    GET
                </button>
                <button onClick={setGetById} className="subsectionbutton">
                    GET BY ID
                </button>
                <button onClick={setGetFavorite} className="subsectionbutton">
                    GET FAVORITES
                </button>
                {employerView.getListApi && <EmployerListFormComponent />}
                {employerView.getIdApi && <EmployerIdFormComponent />}
                {employerView.getFavoriteDb && <EmployerFavoriteForm />}
            </div>
            <div>
                {employerView.getListApi && <EmployerApiListComponent />}
                {employerView.getIdApi && <EmployerApiIdComponent />}
                {employerView.getFavoriteDb && <EmployerFavoriteComponent />}
            </div>
        </div>
    );
};

export default EmployerCompnent;

{
    /* <div style={{ display: "flex", flexDirection: "column" }}>
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
            </div> */
}

/* const chooseGet = () => {
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
}; */
