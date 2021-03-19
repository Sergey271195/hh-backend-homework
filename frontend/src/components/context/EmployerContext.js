import React, { createContext, useReducer } from "react";

const defaultState = {
    employer: [],
    error: null,
};

const EmployerReducer = (state, action) => {
    switch (action.type) {
        case "SET_EMPLOYER":
            return {
                employer: action.employer,
                error: null,
            };
        case "DELETE_EMPLOYER": {
            const filteredEmployer = state.employer.filter(
                (emp) => emp.id !== action.id
            );
            return { ...state, employer: filteredEmployer };
        }
        case "UPDATE_COMMENT": {
            const updatedEmployer = state.employer.map((emp) => {
                return emp.id === action.id
                    ? { ...emp, comment: action.comment }
                    : emp;
            });
            return { ...state, employer: updatedEmployer };
        }
        case "ERROR": {
            return {
                employer: [],
                error: action.error,
            };
        }
        case "CLEAR":
            return defaultState;
        default:
            return state;
    }
};

export const EmployerContext = createContext();

const EmployerContextProvider = ({ children }) => {
    const [employer, dispatchEmployer] = useReducer(
        EmployerReducer,
        defaultState
    );

    return (
        <EmployerContext.Provider value={{ employer, dispatchEmployer }}>
            {children}
        </EmployerContext.Provider>
    );
};

export default EmployerContextProvider;
