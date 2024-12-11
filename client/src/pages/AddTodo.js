import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../api';
import './styles.css'; 

const AddTodo = () => {
    const [todo, setTodo] = useState({ title: '', description: '', status: 'pending' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTodo(todo);
            navigate('/');
        } catch (err) {
            console.error('Failed to create todo:', err);
        }
    };

    return (
        <div className="container"> {/* Added container class */}
            <form onSubmit={handleSubmit} className="todo-form">
                <h1 className="form-title">Add Todo</h1>
                <label className="form-label">
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={todo.title}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </label>
                <label className="form-label">
                    Description:
                    <textarea
                        name="description"
                        value={todo.description}
                        onChange={handleChange}
                        className="form-textarea"
                    />
                </label>
                <label className="form-label">
                    Status:
                    <select name="status" value={todo.status} onChange={handleChange} className="form-select">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
                <button type="submit" className="add-button">Add</button>
            </form>
        </div>
    );
};

export default AddTodo;
