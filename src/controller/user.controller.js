import axios from 'axios';
import { toast } from 'react-toastify';

export const getUser = async () => {
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('todo_token');
    if (!userId) {
        return;
    }
    try {
        const response = await axios.get(`${serverAPI}/api/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data.data;
    } catch (error) {
        console.log(error);
        toast.error("Failed to fetch todos.");
    }
}

export const updateUser = async (values) => {
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('todo_token');
    if (!userId) {
        return;
    }
    try {
        const response = await axios.put(`${serverAPI}/api/users/${userId}`,
            {
                name: values.name,
                email: values.email,
                password: values.password
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response.data;
    } catch (error) {
        if (error.response.data.message == "Email already registered!") {
            toast.error("Email already registered!");
        }
        else {
            console.log(error);
        }
    }
}

export const deleteUser = async () => {
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('todo_token');
    if (!userId) {
        return;
    }
    try {
        const response = await axios.delete(`${serverAPI}/api/users/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        localStorage.removeItem('userId');
        localStorage.removeItem('todo_token');
        return response.data.data;
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete todos.");
    }
}