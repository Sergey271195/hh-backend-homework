import React, { useContext } from "react";
import "../App.css";
import HeaderComponent from "./HeaderComponent";
import EmployerComponent from "./employer/EmployerComponent";
import { MainviewContext } from "./context/MainviewContext";
import EmployerViewContextProvider from "./context/EmployerViewContext";
import EmployerContextProvider from "./context/EmployerContext";
import EnvironmentContextProvider from "./context/EnvironmentContext";

const MainpageComponent = () => {
    const { isEmployerView } = useContext(MainviewContext);
    return (
        <EnvironmentContextProvider>
            <div className="maincontainer">
                <HeaderComponent />
                <div className="viewcontainer">
                    {isEmployerView && (
                        <EmployerViewContextProvider>
                            <EmployerContextProvider>
                                <EmployerComponent />
                            </EmployerContextProvider>
                        </EmployerViewContextProvider>
                    )}
                    {!isEmployerView && <div>Work in progress</div>}
                </div>
            </div>
        </EnvironmentContextProvider>
    );
};

export default MainpageComponent;
