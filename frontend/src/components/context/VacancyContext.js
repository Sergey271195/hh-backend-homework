import React, { createContext, useReducer } from "react";

const VacancyReducer = (state, action) => {
    switch (action.type) {
        case "SET_VACANCY":
            return {
                vacancy: action.vacancy,
            };
        case "CLEAR":
            return { vacancy: "" };
        default:
            return state;
    }
};

export const VacancyContext = createContext();

const VacancyContextProvider = ({ children }) => {
    const [vacancy, dispatchVacancy] = useReducer(VacancyReducer, {
        vacancy: [],
    });

    return (
        <VacancyContext.Provider value={{ vacancy, dispatchVacancy }}>
            {children}
        </VacancyContext.Provider>
    );
};

export default VacancyContextProvider;
