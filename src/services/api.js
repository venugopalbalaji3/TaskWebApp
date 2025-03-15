import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with actual API

export const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

export const loginUser = async (email, password) => {
    const data = await api.post("/user/login", { email, password });
    console.log(data,'data')
    return data;
};

export const registerUser = async (email, password) => {
    const { data } = await api.post("/user/register", { email, password });
    return data;
};

export const fetchTasks = async (token) => {
    console.log(token,'token')
    const { data } = await api.get("/task/list-task", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const addTask = async (task, token) => {
    const { data } = await api.post("/task/create-task", task, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log(data,'data')
    return data;
};

export const updateTask = async (task, token) => {
    console.log('task', task)
    const { data } = await api.put("/task/update-task", task, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const deleteTask = async (taskId, token) => {
    console.log(taskId,'taskId',token)
   const data = await api.post(`/task/delete-task`,taskId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
