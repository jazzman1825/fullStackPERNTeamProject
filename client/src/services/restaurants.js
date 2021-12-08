import axios from 'axios'
const baseUrl = 'http://localhost:4000/restaurants'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
}

const create = async (newObject) => {
    const config = { headers: { Authorization: token } }

    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
}

const update = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`)
    return req.then(res => res.data);
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

const methods = { getAll, create, update, remove, setToken }

export default methods 
