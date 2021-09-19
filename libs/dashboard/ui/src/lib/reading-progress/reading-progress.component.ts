import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'readily-reading-progress',
  templateUrl: './reading-progress.component.html',
  styleUrls: ['./reading-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadingProgressComponent {

  @Input() readingList: any[] = [
    { title: 'The Little Prince', progress: 64 },
    { title: 'Fahrenheit 451', progress: 87 },
    { title: 'Gone with the Wind', progress: 13 },
  ];


}
