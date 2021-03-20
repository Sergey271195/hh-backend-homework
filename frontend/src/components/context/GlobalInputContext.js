import React, { createContext, useReducer } from "react";

export const GlobalInputContext = createContext();

const GlobalInputReducer = (state, action) => {
    switch (action.type) {
        case "CLEAR":
            return { ...state, value: "" };
        case "SET_VALUE":
            return { ...state, value: action.value };
        default:
            return state;
    }
};

const GlobalInputContextProvider = ({ children }) => {
    const [globalInput, dispatchGlobalInput] = useReducer(GlobalInputReducer, {
        value: "",
    });

    return (
        <GlobalInputContext.Provider
            value={{ globalInput, dispatchGlobalInput }}
        >
            {children}
        </GlobalInputContext.Provider>
    );
};

export default GlobalInputContextProvider;
