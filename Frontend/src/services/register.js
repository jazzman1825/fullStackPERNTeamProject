import axios from "axios"
const baseUrl = '/auth/register'

const register = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

const methods = { register }

export default methods