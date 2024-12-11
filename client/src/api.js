import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getTodos = async () => axios.get(API_URL);
export const getTodo = async (id) => axios.get(`${API_URL}/${id}`);
export const createTodo = async (todo) => axios.post(API_URL, todo);
export const updateTodo = async (id, todo) => axios.put(`${API_URL}/${id}`, todo);
export const deleteTodo = async (id) => axios.delete(`${API_URL}/${id}`);
