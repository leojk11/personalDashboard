import { Component, OnInit } from '@angular/core';

// bookmark service
import { BookmarkService } from '../shared/bookmark.service';

// bookmark model
import { Bookmark } from '../shared/boomark.model';

@Component({
  selector: 'app-manange-bookmarks',
  templateUrl: './manange-bookmarks.component.html',
  styleUrls: ['./manange-bookmarks.component.scss']
})
export class ManangeBookmarksComponent implements OnInit {

  bookmarks!: Bookmark[]

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

}
