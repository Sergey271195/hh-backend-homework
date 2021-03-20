import React, { createContext, useReducer } from "react";

export const VacancyViewContext = createContext();

const defaultState = {
    getListApi: true,
    getIdApi: false,
    getFavoriteDb: false,
};

const VacancyViewReducer = (state, action) => {
    switch (action.type) {
        case "GET_LIST":
            return defaultState;
        case "GET_ID":
            return {
                getListApi: false,
                getIdApi: true,
                getFavoriteDb: false,
            };
        case "GET_FAVORITE":
            return {
                getListApi: false,
                getIdApi: false,
                getFavoriteDb: true,
            };
        default:
            return state;
    }
};

const VacancyViewContextProvider = ({ children }) => {
    const [vacancyView, dispatchVacancyView] = useReducer(
        VacancyViewReducer,
        defaultState
    );

    return (
        <VacancyViewContext.Provider
            value={{ vacancyView, dispatchVacancyView }}
        >
            {children}
        </VacancyViewContext.Provider>
    );
};

export default VacancyViewContextProvider;
