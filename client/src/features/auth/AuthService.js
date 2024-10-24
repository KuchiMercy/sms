import axios from "axios";

const backendUrl = 'http://localhost:8000/api/v1'

const register = async (data) => {
    const res = await axios.post(`${backendUrl}/registration`, data)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))

    }
    return res.data

}

const login = async (data) => {
    const res = await axios.post(`${backendUrl}/login`, data)

    if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const verify = async (data) => {
    const res = await axios.post(`${backendUrl}/activate-user`, data)
    return res.data
}

const Logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    verify,
    Logout
}

export default authService;

