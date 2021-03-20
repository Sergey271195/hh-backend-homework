export const fetchEmployerById = (baseUrl, id) => {
    return fetch(baseUrl + `/employer/${id}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            response.json().then((error) => []);
            throw new Error();
        })
        .then((data) => {
            console.log(data);
            return [data];
        })
        .catch((error) => console.log(error.message));
};
