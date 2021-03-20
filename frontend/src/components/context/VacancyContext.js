import React, { createContext, useReducer } from "react";

const defaultState = {
    vacancy: [],
    error: null,
};

const VacancyReducer = (state, action) => {
    switch (action.type) {
        case "SET_VACANCY":
            return {
                vacancy: action.vacancy,
            };
        case "DELETE_VACANCY": {
            const filteredVacancy = state.vacancy.filter(
                (vac) => vac.id !== action.id
            );
            return { ...state, vacancy: filteredVacancy };
        }
        case "UPDATE_COMMENT": {
            const updatedVacancy = state.vacancy.map((vac) => {
                return vac.id === action.id
                    ? { ...vac, comment: action.comment }
                    : vac;
            });
            return { ...state, vacancy: updatedVacancy };
        }
        case "ERROR": {
            return {
                vacancy: [],
                error: action.error,
            };
        }
        case "CLEAR":
            return defaultState;
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
