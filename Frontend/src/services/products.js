import axios from 'axios'
const baseUrl = '/product'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = (id) => {
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

    const res = await axios.put(baseUrl, newObject, config)
    return res.data;
}

const methods = { getAll, create, update, setToken }

export default methods