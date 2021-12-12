import axios from 'axios'
const baseUrl = '/restaurant'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl);
    return req.then(res => res.data);
}

const getOne = (id) => {
    const req = axios.get(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

const create = async (newObject) => {
    const config = { headers: { Authorization: token } }

    const res = await axios.post(baseUrl, newObject, config);
    return res.data;
}

const update = async (newObject) => {
    const config = { headers: { Authorization: token } }

    const res = await axios.put(`/manager/restaurant`, newObject, config)
    return res.data;
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

const methods = { getAll, getOne, create, update, remove, setToken }

export default methods 
