import { Component, OnInit } from '@angular/core';

// router
import { Router } from '@angular/router';

// angular forms
import { NgForm } from '@angular/forms';

// note model
import { Note } from '../shared/note.model';

// note service
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  constructor(
    private noteService: NoteService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // when form get submitted this module is getting called
  onFormSubmit(form: NgForm) {
    // create new note of type Note
    const note = new Note(form.value.title, form.value.content);

    // add the new create note to the note service array
    this.noteService.addNote(note);

    // when the new note is created, navite the user to the notes route
    this.router.navigateByUrl('/notes');
  }

}
