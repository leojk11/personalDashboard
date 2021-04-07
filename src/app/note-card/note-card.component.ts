import { Component, Input, OnInit } from '@angular/core';

// note model
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  // note object that comes from the notes component
  @Input() note!: Note

  constructor() { }

  ngOnInit(): void {
  }

}
