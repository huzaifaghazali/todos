import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';


// const initialTodos = [
//   { id: 1, text: 'walk the dog', completed: false },
//   { id: 2, text: 'walk the cat', completed: false },
//   { id: 3, text: 'walk the fish', completed: true },
//   { id: 4, text: 'walk the chicken', completed: false },
// ];

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem('todos'));
  if(!data) return [];
  return data;
}

export default function TodoList() {
  const [todos, setTodos] = useState(getInitialData);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const removeTodo = (id) => {
    setTodos(prevTodos => {
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed: !todo.completed}
        }
        return todo;
      })
    })
  }

  const addTodo = (text) => {
    setTodos(prevTodos => {
      return [...prevTodos, {text: text, id: new Date(), completed: false }]
    })
  }

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} removeTodo={removeTodo} toggleTodo={toggleTodo} />
      ))}
      <TodoForm addTodo={addTodo} />
    </List>
  );
}
