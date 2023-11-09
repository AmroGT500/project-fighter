
const fetchApi = async (url, data = {} ) => {
    return await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, data);
}

export { fetchApi } 