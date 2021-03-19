import React, { createContext, useReducer } from "react";

export const EmployerViewContext = createContext();

const defaultState = {
    getListApi: true,
    getIdApi: false,
    getFavoriteDb: false,
};

const EmployerViewReducer = (state, action) => {
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

const EmployerViewContextProvider = ({ children }) => {
    const [employerView, setEmployerView] = useReducer(
        EmployerViewReducer,
        defaultState
    );

    return (
        <EmployerViewContext.Provider value={{ employerView, setEmployerView }}>
            {children}
        </EmployerViewContext.Provider>
    );
};

export default EmployerViewContextProvider;
