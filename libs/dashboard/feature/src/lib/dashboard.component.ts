import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book, ReadilyBookState, Shelves } from '@readily/shared/data-access/models';
import { BooksStore } from '@readily/shared/data-access/store';
import { CsvToJsonWorkerService } from '@readily/shared/webworkers';

@Component({
  selector: 'readily-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  vm$ = this.booksStore.vm$;
  constructor(
    private readonly csvToJsonWorkerService: CsvToJsonWorkerService,
    private booksStore: BooksStore) { }

  ngOnInit(): void {
    this.csvToJsonWorkerService.message$.subscribe(data => {
      console.log('data received', data);
      this.booksStore.loadBooks(Object.assign({ loading: false }, data) as ReadilyBookState);
    });
  }

  readFile(event: Event) {
    if (event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log(this.csvToJsonWorkerService.postMessage(reader.result as string));
        };
        reader.readAsText(files[0]);
      }

    }
  }
}
