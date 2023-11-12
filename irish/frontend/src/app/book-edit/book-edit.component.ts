import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {
  @Input() book: any;

  constructor(public activeModal: NgbActiveModal) {}

  save() {
    this.activeModal.close('saved');
  }

  cancel() {
    this.activeModal.dismiss('cancelled');
  }

  
}
