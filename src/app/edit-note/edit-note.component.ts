import { Component, OnInit } from '@angular/core';

// router
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// note service
import { NoteService } from '../shared/note.service';

// note model
import { Note } from '../shared/note.model';

// ng form
import { NgForm } from '@angular/forms';

// notification service
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note!: Note;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // get single note info by getting the id from the URL
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // get the ID param from the URL
      const idParam = paramMap.get('id')!;

      // set the note object
      this.note = this.noteService.getNote(idParam)!;
    })
  }

  // on form submit
  onFormSubmit(form: NgForm) {
    // when form is submitted, update the note that matches the passed ID
    this.noteService.updateNote(this.note.id, form.value);

    // show notification when note has been updated
    this.notificationService.show('Note has been updated', 3000);

    // when form is submitted, reroute to /notes
    this.router.navigateByUrl('/notes');
  }

  // delete not fuction
  deleteNote() {
    // delete the note that maches the passed ID
    this.noteService.deleteNote(this.note.id);

    // show notification when note has been deleted
    this.notificationService.show('Note has been deleted', 3000);

    // when note is deleted, reroute to /notes
    this.router.navigateByUrl('/notes');
  }

}
