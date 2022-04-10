import { Component } from '@angular/core';
import { BooksStore } from '@readily/shared/data-access/store';

@Component({
  selector: 'readily-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  vm$ = this.booksStore.vm$;
  constructor(
    private booksStore: BooksStore
  ) { }

}
