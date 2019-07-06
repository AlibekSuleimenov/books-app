import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookListComponent } from './book-list/book-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/register-book', pathMatch: 'full' },
  { path: 'register-book', component: AddBookComponent },
  { path: 'view-book', component: BookListComponent },
  { path: 'edit-book/:id', component: EditBookComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
