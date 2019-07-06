import { Injectable } from '@angular/core';
import { Book } from '../shared/book';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  booksRef: AngularFireList<any>;   
  bookRef: AngularFireObject<any>;
  
  constructor(private fireDB: AngularFireDatabase) { }

  AddBook(book: Book) {
    this.booksRef.push({
      bookName: book.bookName,
      authorFirstName: book.authorFirstName,
      authorLastName: book.authorLastName,
      issnNumber: book.issnNumber,
      bookDescription: book.bookDescription
    })
  }

  GetBook(id: string) {
    this.bookRef = this.fireDB.object('books-list/' + id);
    return this.bookRef;
  }

  GetBooksList() {
    this.booksRef = this.fireDB.list('books-list');
    return this.booksRef;
  }
  
  UpdateBook(book: Book) {
    this.bookRef.update({
      bookName: book.bookName,
      authorFirstName: book.authorFirstName,
      authorLastName: book.authorLastName,
      issnNumber: book.issnNumber,
      bookDescription: book.bookDescription
    })
  }
  
  DeleteBook(id: string) { 
    this.bookRef = this.fireDB.object('books-list/'+id);
    this.bookRef.remove();
  }
}
