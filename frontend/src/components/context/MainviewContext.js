import React, { createContext, useState } from "react";

export const MainviewContext = createContext();

const MainviewContextProvider = ({ children }) => {
    const [isEmployerView, setIsEmployerView] = useState(true);

    return (
        <MainviewContext.Provider value={{ isEmployerView, setIsEmployerView }}>
            {children}
        </MainviewContext.Provider>
    );
};

export default MainviewContextProvider;
