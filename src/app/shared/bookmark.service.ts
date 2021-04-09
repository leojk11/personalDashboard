import { Injectable } from '@angular/core';

// bookmark model
import { Bookmark } from './boomark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  // all bookmarks
  bookmarks: Bookmark[] = [];

  constructor() { 
    this.loadState();
  }

  // get all bookmarks
  getBookmarks() {
    // console.log(this.bookmarks)
    return this.bookmarks;
  }

  // get single bookmark that matches the passed ID
  getBookmark(id: string) {
    return this.bookmarks.find(b => b.id === id);
  }

  // add new bookmark
  addBookmarks(bookmark: Bookmark) {
    this.bookmarks.push(bookmark);

    this.saveState();
  }

  // update bookmark that matches the passed ID
  updateBookmark(id: string, updatedFields: Partial<Bookmark>) {
    // get the bookmark that matches the passed ID
    const bookmark = this.getBookmark(id);

    // assign changes to the chosen bookmark
    Object.assign(bookmark, updatedFields);

    this.saveState();
  }

  // delete bookmark that matches the passed ID
  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id);

    // of bookmark doesent exist the bookmarkIndex will return -1
    // if bookmarkIndex is -1 then just return
    if(bookmarkIndex === -1) return;

    // delete the bookmark from the array that matches the index
    this.bookmarks.splice(bookmarkIndex, 1);

    this.saveState();
  }

  // save to localStorage
  saveState() {
    // bookmarks array converted into JSON string
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  loadState() {
    // tryCatch is added to prevent invalid JSON data from braking the app
    // when invalid JSON data is entered then error is being console logged
    // before that it was rerouting the app to /
    try {
      const lsBookmarks = JSON.parse(localStorage.getItem('bookmarks')!, (key, value) => {
        // converting the URL string from the JSON to URL objects so we can access the origin, to get favicon
        if(key === 'url') return new URL(value)

        return value
      });

      // if there is no bookmarks item in localStorage then just return
      // othervise error is showing that cannot read property push of null
      // when new bookmark is created
      if(!lsBookmarks) return;

      // clear the bookmarks array
      this.bookmarks.length = 0;
      // modify the items in the bookmarks array so they can be the same as the localStorage ones
      this.bookmarks.push(...lsBookmarks);

    } catch (error) {
      console.log('There was an error getting the bookmarks from localStorage');
      console.log(error);
    }
  }
}
