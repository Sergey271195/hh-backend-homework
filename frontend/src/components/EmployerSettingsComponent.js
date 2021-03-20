import React, { useContext } from "react";
import { EmployerViewContext } from "./context/EmployerViewContext";
import PaginationComponent from "./PaginationComponent";

const EmployerSettingsComponent = () => {
    const { employerView, setEmployerView } = useContext(EmployerViewContext);

    const handleSettingsChange = (event) => {
        switch (event.target.value) {
            case "list": {
                setEmployerView({ type: "GET_LIST" });
                break;
            }

            case "id": {
                setEmployerView({ type: "GET_ID" });
                break;
            }
            case "favorite": {
                setEmployerView({ type: "GET_FAVORITE" });
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
