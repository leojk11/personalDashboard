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

  onFormSubmit(form: NgForm) {
    const { name, url } = form.value;

    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name, url: new URL(url)
    });

    this.router.navigateByUrl('/bookmarks');
  }

}
