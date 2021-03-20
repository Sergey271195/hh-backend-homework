import React, { useContext } from "react";
import { EmployerContext } from "../context/EmployerContext";
import { EmployerViewContext } from "../context/EmployerViewContext";
import { GlobalInputContext } from "../context/GlobalInputContext";
import PaginationComponent from "../PaginationComponent";

const EmployerSettingsComponent = () => {
    const { employerView, setEmployerView } = useContext(EmployerViewContext);
    const { dispatchEmployer } = useContext(EmployerContext);
    const { dispatchGlobalInput } = useContext(GlobalInputContext);

    const handleClear = () => {
        dispatchEmployer({ type: "CLEAR" });
        dispatchGlobalInput({ type: "CLEAR" });
    };

    const handleSettingsChange = (event) => {
        switch (event.target.value) {
            case "list": {
                setEmployerView({ type: "GET_LIST" });
                handleClear();
                break;
            }

            case "id": {
                setEmployerView({ type: "GET_ID" });
                handleClear();
                break;
            }
            case "favorite": {
                setEmployerView({ type: "GET_FAVORITE" });
                handleClear();
                break;
            }
        }
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                    }}
                >
                    <input
                        type="radio"
                        name="employer"
                        value="list"
                        checked={employerView.getListApi}
                        onChange={handleSettingsChange}
                    />
                    <label className="radio_label">По ключевому слову</label>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                    }}
                >
                    <input
                        type="radio"
                        name="employer"
                        value="id"
                        checked={employerView.getIdApi}
                        onChange={handleSettingsChange}
                    />
                    <label className="radio_label">По идентификатору</label>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "5px",
                    }}
                >
                    <input
                        type="radio"
                        name="employer"
                        value="favorite"
                        checked={employerView.getFavoriteDb}
                        onChange={handleSettingsChange}
                    />
                    <label className="radio_label">Из списка избранных</label>
                </div>
            </div>
            {!employerView.getIdApi && <PaginationComponent />}
        </>
    );
};

export default EmployerSettingsComponent;
