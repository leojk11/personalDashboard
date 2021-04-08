import { Component, OnInit } from '@angular/core';

// bookmark service
import { BookmarkService } from '../shared/bookmark.service';

// bookmark model
import { Bookmark } from '../shared/boomark.model';

@Component({
  selector: 'app-bookmakrs',
  templateUrl: './bookmakrs.component.html',
  styleUrls: ['./bookmakrs.component.scss']
})
export class BookmakrsComponent implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

}
