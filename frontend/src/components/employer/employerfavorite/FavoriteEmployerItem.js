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
        <div style={{ display: "flex" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50%",
                }}
            >
                <div>Id: {id}</div>
                <div>Наименование компании: {name}</div>
                <div>Дата создания: {date_create}</div>
                <div>Описание: {description}</div>
                <div>
                    Местоположение: {area.id}: {area.name}
                </div>
                <div>Комментарий: {comment}</div>
                <div>Популярность: {popularity}</div>
                <div>Число просмотров: {views_count}</div>

                <form
                    onSubmit={handleCommentUpdate}
                    style={{ display: "flex", alignItems: "baseline" }}
                >
                    <label style={{ marginLeft: "20px" }}>
                        Новый комментарий
                    </label>
                    <input
                        className="formInput"
                        type="text"
                        value={updateComment}
                        onChange={(event) =>
                            setUpdateComment(event.target.value)
                        }
                    />
                </form>
            </div>
            <div>
                <button
                    className="subsectionbutton"
                    onClick={() => handleDelete()}
                >
                    X
                </button>
                <button
                    className="subsectionbutton"
                    onClick={() => handleRefresh()}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default FavoriteEmployerItem;
