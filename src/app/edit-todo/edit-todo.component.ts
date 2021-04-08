import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// angular router
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// todo model
import { Todo } from '../shared/todo.model';

// todo service
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todo!: Todo

  showValidationErrors!: boolean;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get todo ID from the URL params
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id')!;

      this.todo = this.todoService.getTodo(idParam)!;
    })
  }

  onFormSubmit(form: NgForm) {
    // if form is not filled then just return and show error messages
    if(form.invalid) {
      this.showValidationErrors = true;
      return
    }

    // sending only todo.value bacause there is only one field in the form
    this.todoService.updateTodo(this.todo.id, form.value);

    // when the todo is updated go to /todos URL
    this.router.navigateByUrl('/todos');
  }

}
