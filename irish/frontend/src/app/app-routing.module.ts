import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBooksComponent } from './list-books/list-books.component';

const routes: Routes = [
  { path: 'add-books', component: AddBookComponent },
  { path: '', component: ListBooksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
