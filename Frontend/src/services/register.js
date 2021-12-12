import axios from "axios"
const baseUrl = 'http://localhost:4000/auth/register'

const register = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

const methods = { register }

export default methods