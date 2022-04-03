import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Book } from '@readily/shared/data-access/models';

@Component({
  selector: 'readily-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookOverviewComponent {
  @Input() book!: Book;
}
