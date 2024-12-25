import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from "axios";
import { getItem, getItemAsync } from "expo-secure-store";

const axiosInstance = axios.create({
    baseURL: 'http://106.52.244.92:3333',
    timeout: 10000,
})

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig & { headers: AxiosRequestHeaders }) => {
    const access_token = await getItemAsync('access_token')
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`
    }

    return config
})

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    return response.data
})

export default axiosInstance;
