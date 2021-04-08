import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// angular animations
import { animate, style, transition, trigger } from '@angular/animations';

// todo model
import { Todo } from '../shared/todo.model';

// todo service
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(400, style({
          opacity: 0,
          height: 0,
          marginBottom: 0
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {

  todos!: Todo[]

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get todos
    this.todos = this.todoService.getTodos();
  }

  // update completed state for the todo
  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, { completed: !todo.completed })
  }

  // when edit button is clicked, the function is in the parent component, because there is emmited click in the child component
  // the same goes for the delete function
  onEditClick(todo: Todo) {
    this.router.navigate(['/todos', todo.id]);
  }

  onDeleteClick(todo: Todo) {
    // alert('delete clicked');
    this.todoService.deleteTodo(todo.id);
  }

}
