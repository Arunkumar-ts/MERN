import axios from 'axios';
import { toast } from 'react-toastify';

export const getData = async (searchString, page) => {
  const serverAPI = import.meta.env.VITE_SERVER_API;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('todo_token');
  if (!userId) {
    return;
  }
  try {
    const response = await axios.post(`${serverAPI}/api/todos/list`,
      {
        userId,
        pageSize: 10,
        pageIndex: page - 1,
        searchString
      },
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

export const updateTodo = async (id) => {
  const serverAPI = import.meta.env.VITE_SERVER_API;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('todo_token');
  if (!userId && !id) {
    return;
  }
  try {
    await axios.get(`${serverAPI}/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Todo completed successfully!");
  } catch (error) {
    console.log(error);
    toast.error("Failed to update todo.");
  }
}

export const deleteTodo = async (id) => {
  const serverAPI = import.meta.env.VITE_SERVER_API;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('todo_token');
  if (!userId && !id) {
    return;
  }
  try {
    const response = await axios.delete(`${serverAPI}/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.error("Todo deleted successfully!");
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete todo.");
  }
}

export const createTodo = async (title, dueDate, description) => {
  const serverAPI = import.meta.env.VITE_SERVER_API;
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('todo_token');
  if (!userId) {
    return;
  }
  try {
    const response = await axios.post(`${serverAPI}/api/todos`,
      {
        title,
        description,
        dueDate,
        userId
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    toast.success("Todo created successfully!");
    return response.data.data;
  } catch (error) {
    console.log(error);
    toast.error("Failed to create todo.");
  }
}