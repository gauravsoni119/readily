import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Book } from '@readily/shared/data-access/models';

@Component({
  selector: 'readily-reading-progress',
  templateUrl: './reading-progress.component.html',
  styleUrls: ['./reading-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadingProgressComponent {
  @Input() books: Book[] = [];
}
