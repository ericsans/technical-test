import axios from "axios";

const httpInstance = axios.create({ baseURL: "http://localhost:8000/api" });
httpInstance.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default httpInstance;
