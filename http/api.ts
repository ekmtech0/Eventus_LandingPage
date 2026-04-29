import axios from "axios";

const http = axios.create({
    baseURL: "https://eventus-1mt4.onrender.com/api",
    //baseURL: "http://192.168.100.6:5000/api",
})

export default http;