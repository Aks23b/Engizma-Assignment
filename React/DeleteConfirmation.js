import React from 'react';

const DeleteConfirmation = ({ task, onDeleteConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <h3>Delete</h3>
      <p>Do you want to delete task "{task.title}"?</p>
      <button onClick={() => onDeleteConfirm(task.id)}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
};

export default DeleteConfirmation;
