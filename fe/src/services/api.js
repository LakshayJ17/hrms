import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:8000"
    : "https://hrms-1pbn.onrender.com",
})

export default API
