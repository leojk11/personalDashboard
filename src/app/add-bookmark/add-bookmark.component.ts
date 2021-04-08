import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// bookmark service
import { BookmarkService } from '../shared/bookmark.service';

// bookmark model
import { Bookmark } from '../shared/boomark.model';

// notification service
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  // submit form function
  onFormSubmit(form: NgForm) {
    // create new bookmark of type Bookmark
    const bookmark = new Bookmark(form.value.name, form.value.url);

    // add bookmark new bookmark
    this.bookmarkService.addBookmarks(bookmark);

    // show the notification when bookmark has been added
    this.notificationService.show('Bookmark has been added', 3000);


    // navigate to /bookmarks when bookmark is created
    this.router.navigateByUrl('/bookmarks');
  }

}
