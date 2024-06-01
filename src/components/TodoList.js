import React, { useState, useEffect } from 'react';
import '../styles/TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('asc');

  const addTask = () => {
    if (input.trim()) {
      const newTask = { id: Date.now(), text: input, completed: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const removeTask = (id) => {
    const taskToRemove = document.getElementById(`task-${id}`);
    taskToRemove.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => {
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
    }, 500);
  };

  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleSortChange = (e) => setSort(e.target.value);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'asc') return a.text.localeCompare(b.text);
    if (sort === 'desc') return b.text.localeCompare(a.text);
    return 0;
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>

      <div className="filter-sort">
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
        <label>
          Sort:
          <select value={sort} onChange={handleSortChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} id={`task-${task.id}`} className={task.completed ? 'completed' : ''}>
            {task.text}
            <div>
              <button className="complete" onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button className="remove" onClick={() => removeTask(task.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
