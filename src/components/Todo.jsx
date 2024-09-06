import React, { useState } from "react";
import "./todo.css";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const editTodo = (id, value) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(value);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditMode(false);
    setEditId(null);
    setEditValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      editMode ? updateTodo() : addTodo();
    }
  };
  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input
        value={inputValue}
        type="text"
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleKeyPress}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      ) : (
        <button onClick={addTodo}>Add</button>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => editTodo(todo.id, todo.text)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
