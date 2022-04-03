import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvToJsonWorkerService {
  private worker!: Worker;
  private message$$: Subject<unknown> = new Subject();
  message$: Observable<unknown> = this.message$$.asObservable();

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
