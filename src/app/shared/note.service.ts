import { Injectable } from '@angular/core';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes!: Note[]

  constructor() { }

  // get all notes 
  getNotes() {
    return this.notes;
  }

  // get single note that matches the passed id 
  getNote(id: string) {
    return this.notes.find(n => n.id === id);
  }

  // add new note of type Note
  addNote(note: Note) {
    this.notes.push(note);
  }

  // update note, but do not update the whole object, only the changed parts of it
  updateNote(id: string, updatedFileds: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updatedFileds)
  }

  // delete note that matches the passed id
  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);

    // if note with the passed id doesent exiest the findIndex will return -1
    // if note index is -1 then just return and do not run the splice method
    if(noteIndex === -1) {
      return;
    } else {
      this.notes.splice(noteIndex, 1);
    }
  }
}
