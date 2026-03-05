import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios'

export const loginApi = axios.create({
    baseURL: 'https://poc-ecommerce-kca8.onrender.com',
    timeout: 5000,
})

loginApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('token')
        if (!config.headers) {
                config.headers = AxiosHeaders.from({})
            }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)