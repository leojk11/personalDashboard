import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// bookmark service
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/boomark.model';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    const bookmark = new Bookmark(form.value.name, form.value.url);

    this.bookmarkService.addBookmarks(bookmark);

    this.router.navigateByUrl('/bookmarks');
  }

}
