import { useState } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';


const initialTodos = [
  { id: 1, text: 'walk the dog', completed: false },
  { id: 2, text: 'walk the cat', completed: false },
  { id: 3, text: 'walk the fish', completed: true },
  { id: 4, text: 'walk the chicken', completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

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

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} removeTodo={removeTodo} toggleTodo={toggleTodo} />
      ))}
    </List>
  );
}
