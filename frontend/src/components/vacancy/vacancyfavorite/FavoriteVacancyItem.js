import React, { useContext, useState } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import { EmployerViewContext } from "../../context/EmployerViewContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import { MainviewContext } from "../../context/MainviewContext";
import { VacancyContext } from "../../context/VacancyContext";
import { fetchEmployerById } from "../../fetching/FecthFunctions";

const FavoriteVacancyItem = ({
    vacancy: {
        id,
        name,
        area: { id: areaId, name: areaName },
        employer: { id: employerId, name: employerName },
        date_create,
        created_at,
        salary,
        comment,
        popularity,
        views_count,
    },
}) => {
    const [updateComment, setUpdateComment] = useState("");

    const { dispatchVacancy } = useContext(VacancyContext);
    const { environment } = useContext(EnvironmentContext);
    const { dispatchEmployer } = useContext(EmployerContext);
    const { setEmployerView } = useContext(EmployerViewContext);
    const { setIsEmployerView } = useContext(MainviewContext);

    const handleEmployerClick = () => {
        dispatchEmployer({ type: "CLEAR" });
        fetchEmployerById(environment.baseUrl, employerId).then((data) =>
            dispatchEmployer({ type: "SET_EMPLOYER", employer: data })
        );
        setEmployerView({ type: "GET_ID" });
        setIsEmployerView(true);
    };

    const handleDelete = () => {
        fetch(environment.baseUrl + "/favorites/vacancy/" + id, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    dispatchVacancy({ type: "DELETE_VACANCY", id });
                }
                throw new Error();
            })
            .catch((error) => console.log(error.message));
    };

    const handleRefresh = () => {
        fetch(environment.baseUrl + "/favorites/vacancy/" + id + "/refresh", {
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
        fetch(environment.baseUrl + "/favorites/vacancy/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `comment=${updateComment}`,
        })
            .then((response) => {
                if (response.ok) {
                    dispatchVacancy({
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
                <div
                    className="area"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div
                        className="employer_link"
                        onClick={handleEmployerClick}
                    >
                        {employerName}
                    </div>
                    <div className="salary">
                        {salary?.from ? " от " + salary.from : ""}{" "}
                        {salary?.to ? " до " + salary.to : ""}{" "}
                        {salary?.currency}
                    </div>
                </div>
                <div className="area">{areaName}</div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{ marginTop: "10px" }}>
                        <span className="boldspan">Ваш комментарий:</span>
                        {comment}
                    </div>
                    <div className="area" style={{ marginLeft: "auto" }}>
                        {created_at}
                    </div>
                </div>
                {/* <form
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
                </form> */}
            </div>
        </div>
    );
};

export default FavoriteVacancyItem;
