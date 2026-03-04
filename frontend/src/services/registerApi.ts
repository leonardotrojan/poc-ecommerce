import axios from "axios";

export const registerApi = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
})