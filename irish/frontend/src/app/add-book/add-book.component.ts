import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {

  reactiveForm: FormGroup;
  registerDetails: any = {
    title: '',
    author: '',
    description: '',
    publication_year: '',
    isbn: ''
  }

  constructor(
    public http: HttpClient,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.reactiveForm = this.formBuilder.group({
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.spinner.show()
    this.http.post('http://localhost:8080/users/insert_books', this.registerDetails).subscribe((res: any) => {
      if (res.status) {
        this.spinner.hide()
        this.toastr.success('Success!', res.message);
        this.router.navigate(['']);
        this.registerDetails = {}; // reset the form
      } else {
        this.spinner.hide()
        this.toastr.error('Error!', res.message)
      }
    }, (error) => {
      console.error('Error adding book: ' + error.stack);
      this.spinner.hide();
      this.toastr.error('Error adding book', error.message);
    })
  }
}
