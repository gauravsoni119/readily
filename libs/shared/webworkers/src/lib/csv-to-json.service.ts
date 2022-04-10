import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsvToJsonWorkerService {
  private worker!: Worker;
  private message$$: Subject<unknown> = new Subject();
  // Processing the file is quiet fast. Adding some delay to have loader for sometime.
  message$: Observable<unknown> = this.message$$.asObservable().pipe(delay(2000));

  init(worker: Worker) {
    this.worker = worker;
    this.worker.onmessage = ({ data }) => {
      this.message$$.next(data);
    };
  }

  postMessage(message: unknown) {
    this.worker.postMessage(message);
  }
}
