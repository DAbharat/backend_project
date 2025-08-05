import axios from "./axios";
export const getProfile = () => axios.get("/users/me");
export const updateProfile = (data) =>
  axios.patch("/users/update-profile", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });