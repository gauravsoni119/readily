import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book } from '@readily/shared/data-access/models';

@Component({
  selector: 'readily-books-to-read',
  templateUrl: './books-to-read.component.html',
  styleUrls: ['./books-to-read.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksToReadComponent {
  @Input() books: Book[] = [];
}
