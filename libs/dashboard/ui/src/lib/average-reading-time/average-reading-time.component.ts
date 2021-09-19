import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'readily-average-reading-time',
  templateUrl: './average-reading-time.component.html',
  styleUrls: ['./average-reading-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AverageReadingTimeComponent {

  multi = [
    {
      "name": "Monday",
      "series": [
        {
          "name": "2010",
          "value": 8
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    },

    {
      "name": "Tuesday",
      "series": [
        {
          "name": "2010",
          "value": 24
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    },
    {
      "name": "Wednesday",
      "series": [
        {
          "name": "2010",
          "value": 14
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    },
    {
      "name": "Thursday",
      "series": [
        {
          "name": "2010",
          "value": 20
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    },
    {
      "name": "Friday",
      "series": [
        {
          "name": "2010",
          "value": 6
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    },
    {
      "name": "Saturday",
      "series": [
        {
          "name": "2010",
          "value": 7
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    },
    {
      "name": "Sunday",
      "series": [
        {
          "name": "2010",
          "value": 12
        },
        {
          "name": "2011",
          "value": 24
        }
      ]
    }
  ];

  constructor(readonly iconRegistry: MatIconRegistry, readonly domSanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('books-queue', domSanitizer.bypassSecurityTrustResourceUrl('/assets/dashboard/ui/img/books-queue.svg'));
    iconRegistry.addSvgIcon('pages', domSanitizer.bypassSecurityTrustResourceUrl('/assets/dashboard/ui/img/pages.svg'));
  }

}
