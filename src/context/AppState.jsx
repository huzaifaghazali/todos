import { createContext, useContext, useMemo, useState } from 'react';

// Create Context
const AppStateContext = createContext({
  currentList: null,
});

// Defining AppState Component:
export function AppState({ children }) {
  const [currentList, setCurrentList] = useState(null);

  // create a memoized value that contains the currentList and setCurrentList
  const value = useMemo(
    () => ({
      currentList,
      setCurrentList,
    }),
    [currentList] // Memoization means that the value will only be recalculated if currentList changes.
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

// Create Custom Hook. Utilizes the useContext hook to access the value from the AppStateContext
export function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }

  return context;
}
