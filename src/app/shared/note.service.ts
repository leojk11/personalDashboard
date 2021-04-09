import { Injectable } from '@angular/core';

// note model
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notes: Note[] = [];

  constructor() { 
    this.loadState();
  }

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

    // update the existing localStorage state with the new one
    this.saveState();
  }

  // update note, but do not update the whole object, only the changed parts of it
  updateNote(id: string, updatedFileds: Partial<Note>) {
    const note = this.getNote(id)
    Object.assign(note, updatedFileds);

    // update the existing localStorage state with the new one
    this.saveState();
  }

  // delete note that matches the passed id
  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);

    // if note with the passed id doesent exiest the findIndex will return -1
    // if note index is -1 then just return and do not run the splice method
    if(noteIndex === -1) {
      return;
    } else {
      // splice the existing array
      // delete the note that has matching ID as the passed one
      this.notes.splice(noteIndex, 1);

      // update the existing localStorage state with the new one
      this.saveState();
    }
  }

  // save to localStorage
  saveState() {
    // notes array converted into JSON string
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
  // get the saved state from localStorage
  loadState() {
    // tryCatch is added to prevent invalid JSON data from braking the app
    // when invalid JSON data is entered then error is being console logged
    // before that it was rerouting the app to /
    try {
      const lsNotes = JSON.parse(localStorage.getItem('notes')!);

      // if there is no notes item in localStorage then just return
      // othervise error is showing that cannot read property push of null
      // when new note is created
      if(!lsNotes) return;

      // clear the notes array
      this.notes.length = 0;
      // modify the items in the notes array so they can be the same as the localStorage ones
      this.notes.push(...lsNotes);

    } catch (error) {
      console.log('There was an error getting the notes from localStorage');
      console.log(error);
    }
  }
}
