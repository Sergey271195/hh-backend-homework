import React, { useContext } from "react";
import { GlobalInputContext } from "../context/GlobalInputContext";
import { VacancyContext } from "../context/VacancyContext";
import { VacancyViewContext } from "../context/VacancyViewContext";
import PaginationComponent from "../PaginationComponent";

const VacancySettingsComponent = () => {
    const { vacancyView, dispatchVacancyView } = useContext(VacancyViewContext);
    const { dispatchVacancy } = useContext(VacancyContext);
    const { dispatchGlobalInput } = useContext(GlobalInputContext);

    const handleClear = () => {
        dispatchVacancy({ type: "CLEAR" });
        dispatchGlobalInput({ type: "CLEAR" });
    };

    const handleSettingsChange = (event) => {
        switch (event.target.value) {
            case "list": {
                dispatchVacancyView({ type: "GET_LIST" });
                handleClear();
                break;
            }

            case "id": {
                dispatchVacancyView({ type: "GET_ID" });
                handleClear();
                break;
            }
            case "favorite": {
                dispatchVacancyView({ type: "GET_FAVORITE" });
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
                        checked={vacancyView.getListApi}
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
                        checked={vacancyView.getIdApi}
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
                        checked={vacancyView.getFavoriteDb}
                        onChange={handleSettingsChange}
                    />
                    <label className="radio_label">Из списка избранных</label>
                </div>
            </div>
            {!vacancyView.getIdApi && <PaginationComponent />}
        </>
    );
};

export default VacancySettingsComponent;
