import { CssBaseline, Box } from '@mui/material';

import AllTodoLists from './components/AllTodoLists';
import AppHeader from './components/AppHeader';
import { CurrentTodoList } from './components/CurrentTodoList';

import { AppState } from './context/AppState';

function App() {
  return (
    <>
      <AppState>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppHeader />
          <AllTodoLists />
          <CurrentTodoList />
        </Box>
      </AppState>
    </>
  );
}

export default App;
