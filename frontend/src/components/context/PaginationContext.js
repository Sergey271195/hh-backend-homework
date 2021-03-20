import React, { createContext, useReducer } from "react";

export const PaginationContext = createContext();

const defaultState = {
    page: "",
    per_page: "",
};

const PaginationReducer = (state, action) => {
    switch (action.type) {
        case "SET_PAGE": {
            return { ...state, page: action.page };
        }
        case "SET_PER_PAGE": {
            return { ...state, per_page: action.per_page };
        }
        case "CLEAR": {
            return defaultState;
        }
        default:
            return state;
    }
};

const PaginationContextProvider = ({ children }) => {
    const [pagination, dispatchPagination] = useReducer(
        PaginationReducer,
        defaultState
    );

    return (
        <PaginationContext.Provider value={{ pagination, dispatchPagination }}>
            {children}
        </PaginationContext.Provider>
    );
};

export default PaginationContextProvider;
