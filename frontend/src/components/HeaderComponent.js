import React, { useContext } from "react";
import { MainviewContext } from "./context/MainviewContext";

const HeaderComponent = () => {
    const { setIsEmployerView } = useContext(MainviewContext);

    return (
        <div
            style={{
                display: "flex",
                height: "15%",
                width: "100%",
                justifyContent: "space-around",
                backgroundColor: "lightgoldenrodyellow",
                alignItems: "center",
            }}
        >
            <button
                style={{
                    width: "150px",
                    fontSize: "15px",
                    padding: "20px",
                    borderRadius: "20px",
                }}
                onClick={() => setIsEmployerView(true)}
            >
                Employer
            </button>
            <button
                style={{
                    width: "150px",
                    fontSize: "15px",
                    padding: "20px",
                    borderRadius: "20px",
                }}
                onClick={() => setIsEmployerView(false)}
            >
                Vacancy
            </button>
        </div>
    );
};

export default HeaderComponent;
