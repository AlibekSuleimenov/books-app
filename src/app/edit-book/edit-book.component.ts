import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;  // Define FormGroup to student's edit form

  constructor(
    private crudAPI: CrudService,
    private formBuilder: FormBuilder,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.updateBookData();
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.crudAPI.GetBook(id).valueChanges().subscribe(data => {
      this.editBookForm.setValue(data)
    })
  }

  get bookName() {
    return this.editBookForm.get('bookName');
  }

  get authorFirstName() {
    return this.editBookForm.get('authorFirstName');
  }

  get authorLastName() {
    return this.editBookForm.get('authorLastName');
  }

  get issnNumber() {
    return this.editBookForm.get('issnNumber');
  }  

  get bookDescription() {
    return this.editBookForm.get('bookDescription');
  }

  updateBookData() {
    this.editBookForm = this.formBuilder.group({
      bookName: [''],
      authorFirstName: [''],
      authorLastName: [''],
      issnNumber: [''],
      bookDescription: ['']
    })
  }

  goBack() {
    this.location.back();
  }

  updateForm(){
    this.crudAPI.UpdateBook(this.editBookForm.value);
    this.toastr.success(this.editBookForm.controls['bookName'].value + ' данные успешно изменены!');
    this.router.navigate(['view-book']);
  }

}
