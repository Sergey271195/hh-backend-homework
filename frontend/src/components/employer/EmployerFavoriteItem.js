import React, { useState } from "react";

const BASE_URL = "/api";

const EmployerFavoriteItem = ({ index, employer, deleteEmployer }) => {
    const [comment, setComment] = useState();
    const [employerComment, setEmployerComment] = useState(employer.comment);

    const onSubmitHandle = (event) => {
        event.preventDefault();
        const employerId = employer.id;
        if (!employerId) return;
        fetch(BASE_URL + "/favorites/employer/" + employerId, {
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `comment=${comment}`,
        })
            .then((response) => {
                if (response.ok) setEmployerComment(comment);
            })
            .catch((error) => console.log(error.message));
    };

    return (
        <div
            style={{
                borderBottom: "1px solid black",
                width: "80%",
                marginBottom: "10px",
                padding: "5px",
                paddingBottom: "10px",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    padding: "5px",
                    fontSize: "20px",
                }}
            >
                Employer: {index + 1}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>employer_id</b>: {employer.id}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>employer_name</b>: {employer.name}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>date_create</b>: {employer.date_create}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>description</b>: {employer.description}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>area_id</b>: {employer.area.id}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>area_name</b>: {employer.area.name}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>comment</b>: {employerComment}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>popularity</b>: {employer.popularity}
            </div>
            <div style={{ marginLeft: "20px" }}>
                <b>views_count</b>: {employer.views_count}
            </div>
            <div style={{ display: "flex" }}>
                <form
                    style={{ display: "flex", margin: "20px" }}
                    onSubmit={(event) => onSubmitHandle(event)}
                >
                    <input
                        style={{
                            marginRight: "20px",
                            fontSize: "15px",
                            padding: "10px",
                        }}
                        type="text"
                        placeholder="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                            style={{
                                fontSize: "15px",
                                padding: "10px",
                                backgroundColor: "lightblue",
                            }}
                        >
                            Update Comment
                        </button>
                    </div>
                </form>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "300px",
                    }}
                >
                    <button
                        onClick={() => deleteEmployer(employer.id)}
                        style={{
                            fontSize: "15px",
                            padding: "10px",
                            backgroundColor: "lightcoral",
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployerFavoriteItem;
