import axios from "axios";

const http = axios.create({
        baseURL: "https://eventus-1mt4.onrender.com/api",
        //baseURL: "http://192.168.100.6:5000/api",
        // baseURL: "http://192.168.8.200:5000/api",
})

const ACCESS_TOKEN_KEY = 'eventus_admin_access_token';
const REFRESH_TOKEN_KEY = 'eventus_admin_refresh_token';

// Attach Authorization header if token exists in localStorage
http.interceptors.request.use(
    (config) => {
        try {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem(ACCESS_TOKEN_KEY);
                if (token && config && config.headers) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            }
        } catch (e) {
            // ignore
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Global response handler: clear tokens on 401
http.interceptors.response.use(
    (res) => res,
    (error) => {
        try {
            if (error?.response?.status === 401 && typeof window !== 'undefined') {
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                localStorage.removeItem(REFRESH_TOKEN_KEY);
                // optional: force logout/redirect handled elsewhere
            }
        } catch (e) {
            // ignore
        }
        return Promise.reject(error);
    }
);

export default http;