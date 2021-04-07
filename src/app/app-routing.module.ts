import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookmakrsComponent } from './bookmakrs/bookmakrs.component';
import { NotesComponent } from './notes/notes.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: 'bookmarks', component: BookmakrsComponent, data: { tab: 1 } },
  { path: 'todos', component: TodosComponent, data: { tab: 2 } },
  { path: 'notes', component: NotesComponent, data: { tab: 3 } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
