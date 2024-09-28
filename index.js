const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = require('./db'); 

app.post('/tasks', (req, res) => {
  const { title, description, assignedTo, status, dueDate, priority } = req.body;
  const sql = `INSERT INTO tasks (title, description, assigned_to, status, due_date, priority, completed) VALUES (?, ?, ?, ?, ?, ?, false)`;
  db.query(sql, [title, description, assignedTo, status, dueDate, priority], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    const newTask = { id: result.insertId, title, description, assignedTo, status, dueDate, priority, completed: false };
    res.status(201).json(newTask);
  });
});

app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo, status, dueDate, priority, completed } = req.body;
  const sql = `UPDATE tasks SET title = ?, description = ?, assigned_to = ?, status = ?, due_date = ?, priority = ?, completed = ? WHERE id = ?`;
  db.query(sql, [title, description, assignedTo, status, dueDate, priority, completed, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ id, title, description, assignedTo, status, dueDate, priority, completed });
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tasks WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(204).send();
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
