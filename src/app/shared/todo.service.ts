import { Injectable } from '@angular/core';

// todo model
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
 
  constructor() {
    this.loadState();
  }

  // get all todos
  getTodos() {
    return this.todos;
  }

  // get single todo where the passed ID matches
  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  // add new todo
  addTodo(todo: Todo) {
    this.todos.push(todo);
    
    // update the existing localStorage state with the new one
    this.saveState();
  }

  // update todo where the ID matches
  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    // get the todo that matches the passed ID
    const todo = this.getTodo(id);
    
    // assing the changes
    Object.assign(todo, updatedTodoFields);

    // update the existing localStorage state with the new one
    this.saveState();
  }

  // delete todo where the ID matches the passed ID
  deleteTodo(id: string) {
    // find the index of the given todo ID
    const index = this.todos.findIndex(t => t.id === id);

    // if there is not todo found, findIndex will return -1
    // if index is -1 then just return
    if(index === -1) return;

    // splice the todo that maches the index
    this.todos.splice(index, 1);

    // update the existing localStorage state with the new one
    this.saveState();
  }

  // save to localStorage
  saveState() {
    // notes array converted into JSON string
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  // get the saved state from localStorage
  loadState() {
    // tryCatch is added to prevent invalid JSON data from braking the app
    // when invalid JSON data is entered then error is being console logged
    // before that it was rerouting the app to /
    try {
      const lsTodos = JSON.parse(localStorage.getItem('todos')!);

      // if there is no notes item in localStorage then just return
      // othervise error is showing that cannot read property push of null
      // when new note is created
      if(!lsTodos) return;

      // clear the notes array
      this.todos.length = 0;
      // modify the items in the notes array so they can be the same as the localStorage ones
      this.todos.push(...lsTodos);

    } catch (error) {
      console.log('There was an error getting the todos from localStorage');
      console.log(error);
    }
  }
}
