import axios from "axios"
const baseUrl = '/auth/login'

const login = async credentials => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

const methods = { login }

export default methods