import { CssBaseline, Box } from '@mui/material';

import TodoList from './components/TodoList';
import AppHeader from './components/AppHeader';

import { AppState } from './context/AppState';

function App() {
  return (
    <>
      <AppState>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppHeader />
          <TodoList />
        </Box>
      </AppState>
    </>
  );
}

export default App;
