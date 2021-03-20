import React, { useContext, useState } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import "../../../App.css";

const FavoriteEmployerItem = ({
    employer: {
        id,
        name,
        date_create,
        description,
        area,
        comment,
        popularity,
        views_count,
    },
}) => {
    const [updateComment, setUpdateComment] = useState("");

    const { dispatchEmployer } = useContext(EmployerContext);
    const { environment } = useContext(EnvironmentContext);

    const handleDelete = () => {
        fetch(environment.baseUrl + "/favorites/employer/" + id, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    dispatchEmployer({ type: "DELETE_EMPLOYER", id });
                }
                throw new Error();
            })
            .catch((error) => console.log(error.message));
    };

    const handleRefresh = () => {
        fetch(environment.baseUrl + "/favorites/employer/" + id + "/refresh", {
            method: "POST",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error();
            })
            .then((data) => console.log("REFRESHED: " + data))
            .catch((error) => console.log(error.message));
    };

    const handleCommentUpdate = (event) => {
        event.preventDefault();
        fetch(environment.baseUrl + "/favorites/employer/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `comment=${updateComment}`,
        })
            .then((response) => {
                if (response.ok) {
                    dispatchEmployer({
                        type: "UPDATE_COMMENT",
                        id,
                        comment: updateComment,
                    });
                }
                throw new Error();
            })
            .catch((error) => console.log(error.message));
        setUpdateComment("");
    };

    return (
        <div className="itemcontainer">
            <div style={{ marginBottom: "10px" }}>
                <span
                    style={{
                        padding: "3px 10px",
                        backgroundColor:
                            popularity === "POPULAR" ? "#effbdf" : "#fcf4d6",
                    }}
                >
                    {popularity} <span className="area">({views_count})</span>
                </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                    className="link"
                    style={{ display: "flex", alignItems: "center" }}
                >
                    {name}{" "}
                    <span className="area" style={{ marginLeft: "20px" }}>
                        ({date_create})
                    </span>
                    <span className="trash_icon" onClick={() => handleDelete()}>
                        <img
                            style={{ height: "25px", width: "25px" }}
                            src="/images/trash_icon.png"
                        />
                    </span>
                </div>
                <div className="area">{area.name}</div>
                <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: description }}
                ></div>
                <div style={{ marginTop: "10px" }}>
                    <span className="boldspan">Ваш комментарий:</span>
                    {comment}
                </div>
                <form
                    onSubmit={handleCommentUpdate}
                    style={{ display: "flex", alignItems: "baseline" }}
                >
                    <label style={{ marginRight: "20px" }}>
                        Изменить комментарий
                    </label>
                    <input
                        className="comment"
                        type="text"
                        value={updateComment}
                        onChange={(event) =>
                            setUpdateComment(event.target.value)
                        }
                    />
                </form>
            </div>
        </div>
    );
};

export default FavoriteEmployerItem;
