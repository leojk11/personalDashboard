import { Injectable } from '@angular/core';

// todo model
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = []
 
  constructor() { }

  // get all todos
  getTodos() {
    return this.todos;
  }

  // get single todo where the passed ID matches
  getTodo(id: string) {
    this.todos.find(t => t.id === id);
  }

  // add new todo
  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  // update todo where the ID matches
  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    // get the todo that matches the passed ID
    const todo = this.getTodo(id);

    // assing the changes
    Object.assign(todo, updatedTodoFields);
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
  }
}
