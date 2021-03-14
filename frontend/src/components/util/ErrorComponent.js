import React from "react";

const ErrorComponent = ({ error }) => {
    return (
        <>
            {error && (
                <>
                    <div>Error</div>
                    <div>description: {error.description}</div>
                    <div>status_code: {error.statusCode}</div>
                </>
            )}
        </>
    );
};

export default ErrorComponent;
