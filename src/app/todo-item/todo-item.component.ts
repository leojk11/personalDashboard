import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// todo model
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo

  @Output() editClick: EventEmitter<void> = new EventEmitter()
  @Output() deleteClick: EventEmitter<void> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  // function gives ability to the partent component to emit click to child component
  onEditClick() {
    this.editClick.emit();
  }
  onDeleteClick() {
    this.deleteClick.emit();
  }
}
