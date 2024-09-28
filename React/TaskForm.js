import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ task, onSave }) => {
  const [formData, setFormData] = useState(task || {
    title: '',
    description: '',
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (task) {
      // Update task
      axios.put(`/tasks/${task.id}`, formData)
        .then(() => onSave())
        .catch(err => console.error('Error updating task:', err));
    } else {
      // Create task
      axios.post('/tasks', formData)
        .then(() => onSave())
        .catch(err => console.error('Error creating task:', err));
    }
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'New Task'}</h2>
      <form>
        <label>Assigned To</label>
        <input name="assignedTo" value={formData.assignedTo} onChange={handleChange} />

        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Due Date</label>
        <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />

        <label>Priority</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <button type="button" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default TaskForm;
