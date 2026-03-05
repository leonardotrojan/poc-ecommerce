import axios from "axios";

export const registerApi = axios.create({
    baseURL: 'https://poc-ecommerce-kca8.onrender.com',
    timeout: 5000,
})