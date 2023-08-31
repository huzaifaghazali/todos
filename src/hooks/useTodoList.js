import useSWR from 'swr';

import { APIs, fetcher, putter } from '../utils';

export function useTodoList(currentList) {
  // useSWR ->  hook is called to fetch and manage data.
  // 1st arg ->  func that returns the obj for the data fetching op.
  // 2nd arg -> fetcher func responsible for fetching the data.
  // If currentList is truthy, it returns an obj with two properties:
  // data -> represents the fetched data related to the specific todo list.
  // mutate ->  is a func that allows you to trigger revalidation and update the data manually
  const { data, mutate } = useSWR(
    () => currentList && { url: APIs.TodoList, id: currentList },
    fetcher
  );

  return {
    data,
    // Create new item
    async newItem(newItemName) {
      const newItemsData = {
        name: newItemName,
        checked: false,
        id: crypto.randomUUID(),
      };
      return await mutate(
        await putter({
          url: APIs.TodoList,
          id: currentList,
          name: newItemName,
        }),
        {
          populateCache: false,
          optimisticData: (oldData) => ({
            ...oldData,
            items: [...oldData.items, newItemsData],
          }),
        }
      );
    },
    // Delete item
    async deleteItem(itemToDelete) {
      return await mutate(
        await putter({
          url: APIs.TodoListDelete,
          id: itemToDelete,
        }),
        {
          populateCache: false, // because our putter doesn't return the new item so we want to refetch it instead
          optimisticData: (oldData) => ({
            ...oldData,
            items: oldData.items.filter(({ id }) => id !== itemToDelete),
          }),
        }
      );
    },
  };
}
