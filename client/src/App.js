import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/add" element={<AddTodo />} />
                <Route path="/edit/:id" element={<EditTodo />} />
            </Routes>
        </Router>
    );
}

export default App;
