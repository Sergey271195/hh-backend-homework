import React, { useContext, useState } from "react";
import { EmployerContext } from "../../context/EmployerContext";
import { EmployerViewContext } from "../../context/EmployerViewContext";
import { EnvironmentContext } from "../../context/EnvironmentContext";
import { MainviewContext } from "../../context/MainviewContext";
import { fetchEmployerById } from "../../fetching/FecthFunctions";

const VacancyIdItem = ({
    vacancy: {
        id,
        name,
        area: { id: areaId, name: areaName },
        employer: { id: employerId, name: employerName },
        created_at,
        salary,
    },
}) => {
    const [comment, setComment] = useState("");

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

    const handleAddToFavorite = (event) => {
        event.preventDefault();
        fetch(environment.baseUrl + "/favorites/vacancy", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `comment=${comment}&vacancy_id=${id}`,
        })
            .then((response) => {
                if (!response.ok) throw new Error();
            })
            .catch((error) => console.log(error.message));
    };
    return (
        <form className="itemcontainer" onSubmit={handleAddToFavorite}>
            <div className="link">{name}</div>
            <div
                className="area"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div className="employer_link" onClick={handleEmployerClick}>
                    {employerName}
                </div>
                <div className="salary">
                    {salary?.from ? " от " + salary.from : ""}{" "}
                    {salary?.to ? " до " + salary.to : ""} {salary?.currency}
                </div>
            </div>
            <div className="area">{areaName}</div>
            <div>
                <input
                    className="comment"
                    placeholder="Комментарий"
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "10px",
                        alignItems: "center",
                    }}
                >
                    <button className="item_button">
                        Добавить в избранное
                    </button>
                    <div className="area" style={{ marginLeft: "auto" }}>
                        {created_at}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default VacancyIdItem;
