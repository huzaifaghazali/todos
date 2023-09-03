import { useEffect } from 'react';
import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../context/AppState.jsx';

export default function AllTodoLists() {
  const { data } = useTodoLists(); // add loading
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {}, []);

  return (
    <Drawer
      sx={{
        width: 0.25,
        minWidth: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 0.25,
          minWidth: 200,
          boxSizing: 'border-box',
        },
      }}
      variant='permanent'
      anchor='left'
    >
      {/*Empty Toolbar for spacing*/}
      <Toolbar />
      <List>
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
              >
                {Icon ? <Icon /> : <Icons.List />}
                <ListItemText sx={{ ml: 0.5 }} primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
