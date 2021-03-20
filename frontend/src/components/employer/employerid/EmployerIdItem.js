import React, { useContext, useState } from "react";
import "../../../App.css";
import { EnvironmentContext } from "../../context/EnvironmentContext";

const EmployerIdItem = ({
    employer: {
        id,
        name,
        description,
        area: { id: areaId, name: areaName },
    },
}) => {
    const [comment, setComment] = useState("");

    const { environment } = useContext(EnvironmentContext);

    const handleAddToFavorite = (event) => {
        event.preventDefault();
        fetch(environment.baseUrl + "/favorites/employer", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `comment=${comment}&employer_id=${id}`,
        })
            .then((response) => {
                if (!response.ok) throw new Error();
            })
            .catch((error) => console.log(error.message));
    };
    return (
        <form className="itemcontainer" onSubmit={handleAddToFavorite}>
            <div className="link">{name}</div>
            <div className="area">{areaName}</div>
            <div
                className="description"
                dangerouslySetInnerHTML={{ __html: description }}
            ></div>

            <div>
                <input
                    className="comment"
                    placeholder="Комментарий"
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <button className="item_button">Добавить в избранное</button>
            </div>
        </form>
    );
};

export default EmployerIdItem;
