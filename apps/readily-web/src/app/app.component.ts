import { Component } from '@angular/core';
import { CsvToJsonWorkerService } from '@readily/shared/webworkers';

@Component({
  selector: 'readily-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'readily-web';
  constructor(private readonly csvToJsonWorkerService: CsvToJsonWorkerService) {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(
        new URL('./workers/csv-to-json.worker', import.meta.url)
      );
      this.csvToJsonWorkerService.init(worker);
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
