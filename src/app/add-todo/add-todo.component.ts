import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// notification service
import { NotificationService } from '../shared/notification.service';

// todo model
import { Todo } from '../shared/todo.model';

// todo service
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  showValidationErrors!: boolean;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  // on form submit function
  onFormSubmit(form: NgForm) {
    // if form is invalid show errors and return
    if(form.invalid) {
      this.showValidationErrors = true;

      return;
    };

    // create new todo
    const todo = new Todo(form.value.text);

    // add new todo to the todos list
    this.todoService.addTodo(todo);

    // set notification when the todo is added
    this.notificationService.show('New todo has been added', 3000);

    // reroute when new todo has been added
    this.router.navigateByUrl('/todos');
  }

}
