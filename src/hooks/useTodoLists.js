import useSWR from 'swr'; // used for data fetching and caching in React applications.

import { APIs, fetcher, putter } from '../utils';

export function useTodoLists() {
  // url -> API endpoint for fetching todo lists.
  // fetcher -> handles data fetching from the database using IndexedDB
  // data ->  represents the fetched data
  // mutate -> function used to manually trigger revalidation of the data.
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    data,
    // Create a new todo list
    async newList(newListName, icon) {
      return await mutate(
        await putter({
          url: APIs.TodoLists,
          icon: icon || 'List', // note: not using default param since an empty string is the default and won't be falsy
          name: newListName,
        }),
        {
          populateCache: false, // prevent immediately updating the local cache.
          optimisticData: (oldData) => [
            ...oldData,
            // appends the new list (with its name, icon, and an empty data array) to the existing data.
            { name: newListName, icon: icon || 'List', data: [] },
          ],
        }
      );
    },
    // Update the name of an existing todo list.
    async updateList(listToUpdate, newListName) {
      await mutate(
        await (putter({
          url: APIs.TodoListsUpdate,
          id: listToUpdate,
          name: newListName,
        }),
        {
          populateCache: false, // prevent immediate cache update
          optimisticData: (oldData) =>
          // updates the name; otherwise, it returns the existing data.
            oldData.map((d) => {
              if (d.id === listToUpdate) {
                return { ...d, name: newListName };
              }
              return d;
            }),
        })
      );
    },
  };
}
