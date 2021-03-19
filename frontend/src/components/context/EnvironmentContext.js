import React, { createContext } from "react";

export const EnvironmentContext = createContext();

const environment = {
    baseUrl: "/api",
};

const EnvironmentContextProvider = ({ children }) => {
    return (
        <EnvironmentContext.Provider value={{ environment }}>
            {children}
        </EnvironmentContext.Provider>
    );
};

export default EnvironmentContextProvider;
