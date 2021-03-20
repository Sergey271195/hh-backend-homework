import React, { useContext } from "react";
import "../App.css";
import HeaderComponent from "./HeaderComponent";
import EmployerComponent from "./employer/EmployerComponent";
import { MainviewContext } from "./context/MainviewContext";
import EmployerViewContextProvider from "./context/EmployerViewContext";
import EmployerContextProvider from "./context/EmployerContext";
import EnvironmentContextProvider from "./context/EnvironmentContext";
import GlobalInputContextProvider from "./context/GlobalInputContext";
import VacancyViewContextProvider from "./context/VacancyViewContext";
import VacancyContextProvider from "./context/VacancyContext";
import VacancyComponent from "./vacancy/VacancyComponent";

const MainpageComponent = () => {
    const { isEmployerView } = useContext(MainviewContext);
    return (
        <EnvironmentContextProvider>
            <GlobalInputContextProvider>
                <EmployerViewContextProvider>
                    <EmployerContextProvider>
                        <VacancyViewContextProvider>
                            <VacancyContextProvider>
                                <div className="maincontainer">
                                    <HeaderComponent />
                                    {isEmployerView ? (
                                        <EmployerComponent />
                                    ) : (
                                        <VacancyComponent />
                                    )}
                                </div>
                            </VacancyContextProvider>
                        </VacancyViewContextProvider>
                    </EmployerContextProvider>
                </EmployerViewContextProvider>
            </GlobalInputContextProvider>
        </EnvironmentContextProvider>
    );
};

export default MainpageComponent;
