import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo } from '../api';
import './styles.css'; 

const HomePage = () => {
    const [todos, setTodos] = useState([]);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // State for filter

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const { data } = await getTodos();
            setTodos(data);
            setFilteredTodos(data); // Initialize filteredTodos with all todos
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch todos:', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);
            fetchTodos(); // Refresh the list after deletion
        } catch (err) {
            console.error('Failed to delete todo:', err);
        }
    };

    const handleFilterChange = (e) => {
        const status = e.target.value;
        setFilter(status);
        if (status === 'all') {
            setFilteredTodos(todos);
        } else {
            const filtered = todos.filter((todo) => todo.status === status);
            setFilteredTodos(filtered);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container"> {/* Added container class */}
            <h1 className="title">Todo List</h1>
            <div className="filter-container">
                <label htmlFor="filter" className="form-label">Filter by Status:</label>
                <select id="filter" value={filter} onChange={handleFilterChange} className="form-select small-select"> {/* Added small-select class */}
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <li key={todo._id} className="todo-item">
                        <h2 className="todo-title">{todo.title}</h2>
                        <p className="todo-description">{todo.description}</p>
                        <p className="todo-status">Status: {todo.status}</p>
                        <div className="button-group">
                            <Link to={`/edit/${todo._id}`} className="edit-button">Edit</Link>
                            <button onClick={() => handleDelete(todo._id)} className="delete-button">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
