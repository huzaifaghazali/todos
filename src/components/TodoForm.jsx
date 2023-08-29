import { useState } from 'react';
import { IconButton, InputAdornment, ListItem, TextField } from '@mui/material';
import Create from '@mui/icons-material/Create';

export default function TodoForm({addTodo}) {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
   event.preventDefault();
   addTodo(text)
   setText('');
  }

  return (
    <ListItem>
      <form onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          label='Add Todo'
          variant='outlined'
          value={text}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton aria-label='create todo' edge='end' type='submit'>
                  <Create />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </ListItem>
  );
}
