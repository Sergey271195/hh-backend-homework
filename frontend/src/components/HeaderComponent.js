import React from "react";

const HeaderComponent = ({ setShowEmployer }) => {
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
                onClick={() => setShowEmployer(true)}
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
                onClick={() => setShowEmployer(false)}
            >
                Vacancy
            </button>
        </div>
    );
};

export default HeaderComponent;
