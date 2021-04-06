import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookmakrsComponent } from './bookmakrs/bookmakrs.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmakrsComponent },
  { path: 'todos', component: TodosComponent },
  { path: 'notes', component: NotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
