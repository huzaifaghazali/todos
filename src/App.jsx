import { CssBaseline, Box } from '@mui/material';

import TodoList from './components/TodoList';
import Navbar from './components/Navbar';

import { AppState } from './context/AppState';

function App() {
  return (
    <>
      <AppState>
        <Box>
          <CssBaseline />
          <Navbar />
          <TodoList />
        </Box>
      </AppState>
    </>
  );
}

export default App;
