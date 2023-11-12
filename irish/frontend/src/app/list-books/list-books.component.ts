import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';
import { DataServiceService } from "../service/data-service.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


export interface Book {
  id: any
  title: string;
  author: string;
  description: string;
  publication_year: string;
  isbn: string
}

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})

export class ListBooksComponent {
  searchTerm: string = '';
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'title', 'author', 'description', 'publication_year', 'isbn', 'action'];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  books: any;
  filteredBooks: any;
  currentPage = 1;
  noDataFound: boolean = false;
  filterBooks: any
  items: any[] = [];
  totalPages!: number;
  pageSize: number = 5;

  constructor(
    private dataService: DataServiceService,
    private modalService: NgbModal,
    private http: HttpClient,
    private toastr: ToastrService,
    private location: Location,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.applyFilter()
  }

  back() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event) => {
      this.getData(event.pageIndex + 1, this.paginator.pageSize);
    });
  }

  deleteBook(id: number) {
    this.dataService.getData(`/delete_books/${id}`).subscribe({
      next: (data: any) => {
        if (data && data.status) {
          this.books = data.books;
          this.changeDetectorRefs.detectChanges();
          this.toastr.success('Book deleted successfully');
        } else {
          this.toastr.error('Error deleting book');
        }
      },
      error: (error) => {
        this.toastr.error('Error deleting book', error.message);
      }
    })
  }

  editBook(book: any) {
    const modalRef = this.modalService.open(BookEditComponent);
    modalRef.componentInstance.book = book;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.http.put(`http://localhost:8080/users/update_books/${book.id}`, book).subscribe((res: any) => {
          if (res.status) {
            this.toastr.success('Book updated successfully');
          } else {
            this.toastr.error('Error updating book');
          }
        }, (error) => {
          this.toastr.error('Error updating book', error.message);
        });
      }
    });
  }

  getData(page: number, pageSize: number) {
    this.dataService.getData(`/books_pagination?page=${page}&pageSize=${pageSize}`).subscribe((data: any) => {
      this.dataSource = data.items;
      this.totalPages = data.totalPages;
    });
  }

applyFilter() {
  this.http.get(`http://localhost:8080/users/search_books?term=${this.searchTerm}`).subscribe((data: any) => {
    if (data.length > 0) {
      this.books = data
      this.dataSource = this.books;
      this.noDataFound = false;
      this.searchTerm = '';
    }
    else {
      this.noDataFound = true;
      this.dataSource = this.books;
      this.searchTerm = '';
    }
  }, (error) => {
    this.toastr.error('Error searching for books', error.message);
  });
}
}


