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
  };
}
