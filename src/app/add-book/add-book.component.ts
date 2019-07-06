import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public bookForm: FormGroup;

  constructor( 
    public crudAPI: CrudService, 
    public formBuilder: FormBuilder, 
    public toastr: ToastrService) {}

  ngOnInit() {
    this.crudAPI.GetBooksList();
    this.booksForm();
  }

  booksForm() {
    this.bookForm = this.formBuilder.group({
      bookName: [''],
      authorFirstName: [''],
      authorLastName: [''],
      issnNumber: [''],
      bookDescription: ['']
    })  
  }

  get bookName() {
    return this.bookForm.get('bookName');
  }

  get firstName() {
    return this.bookForm.get('authorFirstName');
  }

  get lastName() {
    return this.bookForm.get('authorLastName');
  }  

  get issnNumber() {
    return this.bookForm.get('issnNumber');
  }

  get bookDescription() {
    return this.bookForm.get('bookDescription');
  }

  ResetForm() {
    this.bookForm.reset();
  }

  submitBookData() {
    this.crudAPI.AddBook(this.bookForm.value);
    this.toastr.success(this.bookForm.controls['bookName'].value + ' успешно добавлена!'); 
    this.ResetForm();
   };

}
