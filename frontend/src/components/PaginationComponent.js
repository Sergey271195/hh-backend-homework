import React, { useContext } from "react";
import { PaginationContext } from "./context/PaginationContext";

const PaginationComponent = () => {
    const { pagination, dispatchPagination } = useContext(PaginationContext);

    const valideInput = (event) => {
        if (!isNaN(event.target.value) && event.target.value >= 0) return true;
    };

    const handleSetPage = (event) => {
        if (!valideInput(event)) return;
        dispatchPagination({
            type: "SET_PAGE",
            page: event.target.value,
        });
    };

    const handleSetPerPage = (event) => {
        if (!valideInput(event)) return;
        dispatchPagination({
            type: "SET_PER_PAGE",
            per_page: event.target.value,
        });
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
            }}
        >
            <div style={{ marginBottom: "10px" }}>Пагинация</div>
            <div style={{ marginBottom: "5px" }}>
                <input
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Номер страницы"
                    value={pagination.page}
                    onChange={handleSetPage}
                />
            </div>
            <div>
                <input
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Число элементов"
                    value={pagination.per_page}
                    onChange={handleSetPerPage}
                />
            </div>
        </div>
    );
};

export default PaginationComponent;
