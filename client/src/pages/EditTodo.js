import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodo, updateTodo } from '../api';
import './styles.css'; // Import the CSS file

const EditTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState({ title: '', description: '', status: '' });

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () => {
        try {
            const { data } = await getTodo(id);
            setTodo(data);
        } catch (err) {
            console.error('Failed to fetch todo:', err);
        }
    };

    const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTodo(id, todo);
            navigate('/');
        } catch (err) {
            console.error('Failed to update todo:', err);
        }
    };

    return (
        <div className="container"> {/* Added container class */}
            <form onSubmit={handleSubmit} className="todo-form">
                <h1 className="form-title">Edit Todo</h1>
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
                <button type="submit" className="add-button">Update</button>
            </form>
        </div>
    );
};

export default EditTodo;