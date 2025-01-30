import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });  const [task, setTask] = useState('');

  // Carga TODOs del local storage con ese nombre de guardado
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  // se actualiza los TODOs en el local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  // Agregar TODO a la lista
  const handleAddTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, task]);
      setTask('');
    }
  };
  // Eliminar TODO
  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App text-center">
      <header className="App-header flex flex-col items-center justify-center text-white">
        <h1 className="mt-[10px]">TODO App</h1>
        <div className="todo-input flex items-center mb-[20px]">
          <input
            type="text"
            placeholder="Add a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-[7px] text-[16px] border-solid rounded-sm mr-[10px] bg-gray-600 text-white"
          />
          <button
            onClick={handleAddTodo}
            className="px-[7px] py-[7px] text-[16px] bg-[#61c0d7] text-white border-none rounded-sm cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="todo-list list-none p-0">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex mb-[20px] justify-between items-center bg-[#333] p-2 rounded-sm w-[300px]"
            >
              <span className="text-left text-white flex-1">{todo}</span>
              <button
                onClick={() => handleRemoveTodo(index)}
                className="bg-[#ff6c6c] text-white border-none p-1 rounded-sm cursor-pointer ml-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
