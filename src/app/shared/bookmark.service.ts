import { Injectable } from '@angular/core';

// bookmark model
import { Bookmark } from './boomark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  // all bookmarks
  bookmarks: Bookmark[] = [];

  constructor() { }

  // get all bookmarks
  getBookmarks() {
    return this.bookmarks;
  }

  // get single bookmark that matches the passed ID
  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id);
  }

  // add new bookmark
  addBookmarks(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);
  }

  // update bookmark that matches the passed ID
  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    // get the bookmark that matches the passed ID
    const bookmark = this.getBookmark(id);

    // assign changes to the chosen bookmark
    Object.assign(bookmark, updatedFields);
  }

  // delete bookmark that matches the passed ID
  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);

    // of bookmark doesent exist the bookmarkIndex will return -1
    // if bookmarkIndex is -1 then just return
    if(bookmarkIndex === -1) return;

    // delete the bookmark from the array that matches the index
    this.bookmarks.splice(bookmarkIndex, 1);
  }
}
