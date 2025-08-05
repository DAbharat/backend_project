import axios from "./axios";
export const login = (data) => axios.post("/users/login", data);
export const register = (data) =>
  axios.post("/users/register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const logout = () => axios.post("/users/logout");