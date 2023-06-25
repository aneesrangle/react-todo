import React, { useState } from 'react';
import styles from './ToDoItem.module.scss';
import { TODO } from '../../types';

interface ToDoItemProps {
  todo: TODO;
  onDelete: (id: number) => void;
  onEdit: (id: number, newLabel: string) => void;
  toggleComplete: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onDelete, toggleComplete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.label);

  const handleEditValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.todoItem}>
      <div className={styles.labelContainer}>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={handleEditValueChange}
            onKeyDown={handleEditSubmit}
            onBlur={() => {
              setIsEditing(false);
              onEdit(todo.id, editValue);
            }}
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={todo.completed ? styles.completed : ''}
          >
            {todo.label}
          </span>
        )}
      </div>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default ToDoItem;
