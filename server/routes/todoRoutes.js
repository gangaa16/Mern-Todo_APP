const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a todo
router.post('/', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all todos or a specific todo
router.get('/:id?', async (req, res) => {
    try {
        const todos = req.params.id 
            ? await Todo.findById(req.params.id) 
            : await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(404).json({ error: 'Todo not found' });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
