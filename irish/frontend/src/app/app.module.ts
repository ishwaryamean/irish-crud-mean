import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ListBooksComponent } from './list-books/list-books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MyNavComponent } from './my-nav/my-nav.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    ListBooksComponent,
    MyNavComponent,
    BookEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatMenuModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
    }),
  ],
  providers: [NgbModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
