
const fetchApi = async (url, data = {} ) => {
    return await fetch(`http://localhost:5555/${url}`, data);
}

export { fetchApi } 