import React, { useState } from "react";
import "../App.css";
import HeaderComponent from "./HeaderComponent";
import EmployerCompnent from "./employer/EmployerCompnent";

const MainpageComponent = () => {
    const [showEmployer, setShowEmployer] = useState(true);

    return (
        <div className="maincontainer">
            <HeaderComponent setShowEmployer={setShowEmployer} />
            <div className="viewcontainer">
                {showEmployer && <EmployerCompnent />}
                {!showEmployer && <div>Work in progress</div>}
            </div>
        </div>
    );
};

export default MainpageComponent;
