import axios from 'axios'
const baseUrl = 'http://localhost:4000/product'

const getAll = (id) => {
    const req = axios.get(`${baseUrl}/${id}`);
    return req.then(res => res.data);
}

const methods = { getAll }

export default methods