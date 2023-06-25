import React, { useEffect, useState } from 'react';
import ToDoItem from '../ToDoItem/ToDoItem';
import { TODO } from '../../types';

const savedTodos = localStorage.getItem('todos');
const INITIAL_TODOS: TODO[] = savedTodos ? JSON.parse(savedTodos) : [];

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo === '') {
      return;
    }

    const id = todos.length === 0 ? 0 : todos[todos.length - 1].id + 1;
    const newToDo: TODO = {
      id,
      label: newTodo,
      completed: false,
      isEditing: false,
    };

    setNewTodo('');
    setTodos([...todos, newToDo]);
  };

  const deleteToDo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editToDo = (id: number, newLabel: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.label = newLabel;
        }
        return todo;
      })
    );
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const getFilteredToDos = () => {
    return todos.filter(todo => {
      if (filter === 'Completed') {
        return todo.completed;
      } else if (filter === 'Incomplete') {
        return !todo.completed;
      }

      if (!!search && !todo.label.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  return (
    <div>
      <h1>To Do List</h1>
      <input
        type="text"
        placeholder="Enter a new todo"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={() => addTodo()}>Add ToDo</button>
      <div>
        Filter:
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {getFilteredToDos().map((todo: TODO) => {
        return (
          <div key={todo.id}>
            <ToDoItem
              onDelete={deleteToDo}
              onEdit={editToDo}
              toggleComplete={toggleComplete}
              todo={todo}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ToDoList;
