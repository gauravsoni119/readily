import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book } from '@readily/shared/data-access/models';

@Component({
  selector: 'readily-books-to-read',
  templateUrl: './books-to-read.component.html',
  styleUrls: ['./books-to-read.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksToReadComponent implements OnInit {

  @Input() books: Book[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
