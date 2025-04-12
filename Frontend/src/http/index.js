import axios from "axios";

// Base API instance
const API = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Authenticated API instance
const APIAuthenticated = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


// Interceptor to
APIAuthenticated.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');  // Fetch the latest token
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { API, APIAuthenticated };


const api = axios.create({
    baseURL: "http://localhost:3000/api/auth/",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    // withCredentials: true,
});


export const googleAuth = (code) => api.get(`/google?code=${code}`);