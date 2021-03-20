import React, { useContext } from "react";
import "../App.css";
import HeaderComponent from "./HeaderComponent";
import EmployerComponent from "./employer/EmployerComponent";
import { MainviewContext } from "./context/MainviewContext";
import EmployerViewContextProvider from "./context/EmployerViewContext";
import EmployerContextProvider from "./context/EmployerContext";
import EnvironmentContextProvider from "./context/EnvironmentContext";
import GlobalInputContextProvider from "./context/GlobalInputContext";

const MainpageComponent = () => {
    const { isEmployerView } = useContext(MainviewContext);
    return (
        <EnvironmentContextProvider>
            <GlobalInputContextProvider>
                <EmployerViewContextProvider>
                    <EmployerContextProvider>
                        <div className="maincontainer">
                            <HeaderComponent />
                            {isEmployerView && <EmployerComponent />}
                            {!isEmployerView && <div>Work in progress</div>}
                        </div>
                    </EmployerContextProvider>
                </EmployerViewContextProvider>
            </GlobalInputContextProvider>
        </EnvironmentContextProvider>
    );
};

export default MainpageComponent;
