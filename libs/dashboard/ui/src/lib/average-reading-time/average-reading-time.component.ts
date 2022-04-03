import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'readily-average-reading-time',
  templateUrl: './average-reading-time.component.html',
  styleUrls: ['./average-reading-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AverageReadingTimeComponent {
  @Input() readBooks = 0;
  @Input() totalPagesRead = 0;
  @Input() avgPagesRead = 0;
  @Input() readBookSeries: { name: string; value: number }[] = [];

  constructor(
    readonly iconRegistry: MatIconRegistry,
    readonly domSanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'books-queue',
      domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/dashboard/ui/img/books-queue.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'pages',
      domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/dashboard/ui/img/pages.svg'
      )
    );
  }

  tooltipText(series: { data: { label: string; value: unknown } }) {
    return `${series.data.label} ${series.data.value} book(s)`;
  }
}
