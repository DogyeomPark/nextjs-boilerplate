"use client";

import { useEffect, useState} from 'react';
import axios from "axios";
import { Todo } from '@/type';

export default function TodosPage(){
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);


  const fetchTodos = async () => {
    try {
      const data = await axios.get("http://localhost:8060/todo");
      console.log('data', data.data);
      setTodos(data.data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    } finally {
      setLoading(false);
    }
  };

  const addTodoItem = async () => {
    try {
      // await axios.post("http://localhost:8060/todos/create", { value });
      await fetchTodos();
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  };


  useEffect(() => {
    void fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.done} readOnly />
            <button type="button" onClick={addTodoItem}>Click to add todo items</button>
            <span>{todo.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

