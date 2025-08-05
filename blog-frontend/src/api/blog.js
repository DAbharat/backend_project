import axios from "./axios";
export const getAllBlogs = () => axios.get("/blogs");
export const getBlogById = (id) => axios.get(`/blogs/${id}`);
export const createBlog = (data) => axios.post("/blogs", data);
export const updateBlog = (id, data) => axios.patch(`/blogs/${id}`, data);
export const deleteBlog = (id) => axios.delete(`/blogs/${id}`);
export const togglePublish = (id) => axios.patch(`/blogs/toggle/publish/${id}`);