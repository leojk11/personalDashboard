import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

// bookmark service
import { BookmarkService } from '../shared/bookmark.service';

// bookmark model
import { Bookmark } from '../shared/boomark.model';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  bookmark!: Bookmark;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // get the ID from the url params
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookMarkId = paramMap.get('id')!;

      // set bookmark to the bookmark that matches the passed ID
      this.bookmark = this.bookmarkService.getBookmark(bookMarkId)!;
    })
  }

  // on form submit edit the chosen bookmark
  onFormSubmit(form: NgForm) {
    // get the name and url from form
    const { name, url } = form.value;

    // edit the bookmark that matches the passed ID
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name, url: new URL(url)
    });

    // navigate to /bookmarks
    this.router.navigateByUrl('/bookmarks');
  }

  // delete bookmark function
  deleteBookmark() {
    // delete the bookmark that matches the passed ID
    this.bookmarkService.deleteBookmark(this.bookmark.id);

    // navigate to /bookmarks
    this.router.navigateByUrl('/bookmarks');
  }

}
