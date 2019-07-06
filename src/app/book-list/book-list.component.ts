import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';  
import { Book } from './../shared/book';   
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  p: number = 1;
  Book: Book[];
  hideWhenNoBook: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  

  constructor(
    public crudAPI: CrudService,
    public toastr: ToastrService
    ) {}

  ngOnInit() {
    this.dataState();
    let s = this.crudAPI.GetBooksList();
    s.snapshotChanges().subscribe(data => {
      this.Book = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Book.push(a as Book);
      })
    })
  }

  dataState() {     
    this.crudAPI.GetBooksList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoBook = false;
        this.noData = true;
      } else {
        this.hideWhenNoBook = true;
        this.noData = false;
      }
    })
  }
  
  deleteBook(book) {
    if (window.confirm('Вы действительно хотите удалить эту книгу?')) {
      this.crudAPI.DeleteBook(book.$key)
      this.toastr.success(book.bookName + ' успешно удалено!');
    }
  }
}
