import Dexie from 'dexie'; // works with IndexedDB

// Creating the Database Instance:
export const db = new Dexie('todo-list-db');

// Defining Database Schema:
db.version(2).stores({
  lists: '++id, name', // Primary key and indexed props
  listItems: '++id, name, checked, listId',
});

export const APIs = {
  TodoLists: 'todo-lists',
  TodoListsUpdate: 'todo-lists-update',
  TodoList: 'todo-list',
  TodoListDelete: 'todo-list-delete',
  TodoListUpdate: 'todo-list-update',
};

// function to retrieve data from the IndexedDB
export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.toArray(); // fetches all todo lists from the lists table.
    case APIs.TodoList:
      return {
        ...(await db.lists.get(variables.id)), // fetches a specific todo list from the lists table
        items:
          (await db.listItems.where({ listId: variables.id }).toArray()) ?? [], // fetches all related list items from the listItems table where listId matches the specified id.
      };
    default:
      throw new Error(`Unknown API ${url}`);
  }
}

//  function to modify the data in the IndexedDB
export async function putter({ url, id, ...variables }) {
  switch (url) {
    case APIs.TodoLists:
      return db.lists.add({ name: variables.name, icon: variables.icon }); // adds a new todo list to the lists table.
    case APIs.TodoListsUpdate:
      return db.lists.update(id, { name: variables.name }); // updates the name of an existing todo list in the lists table.
    case APIs.TodoList:
      return db.listItems.add({ listId: id, name: variables.name }); // it adds a new item to the listItems table associated with a specific list.
    case APIs.TodoListDelete:
      return db.listItems.delete(id); // it deletes an item from the listItems table based on the provided id.
    case APIs.TodoListUpdate:
      return db.listItems.update(id, variables); // it updates an item in the listItems table based on the provided id and variables.
    default:
      throw new Error(`Unknown API ${url}`);
  }
}
