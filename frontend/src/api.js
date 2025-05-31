import axios from "axios";

const API = axios.create({ baseURL: "https://online-examination-portal-backend-8k3g.onrender.com/api/auth" });

export const signup = (formData) => API.post("/signup", formData);
export const login = (formData) => API.post("/login", formData);
