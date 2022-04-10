import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { BooksStore } from '@readily/shared/data-access/store';
import { CsvToJsonWorkerService } from '@readily/shared/webworkers';
import { ReadilyBookState } from '@readily/shared/data-access/models';

@Component({
  selector: 'readily-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  vm$ = this.booksStore.vm$;

  searchFormGroup = this.formBuilder.group({
    searchTerm: [''],
  });

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readonly csvToJsonWorkerService: CsvToJsonWorkerService,
    private breakpointObserver: BreakpointObserver,
    private readonly formBuilder: FormBuilder,
    private readonly booksStore: BooksStore
  ) { }

  ngOnInit(): void {
    this.csvToJsonWorkerService.message$.subscribe((data) => {
      console.log('data received', data);
      this.booksStore.loadBooks(
        Object.assign({ loading: false }, data) as ReadilyBookState
      );
    });
  }

  onFileUpload(file: File): void {
    this.booksStore.addFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.csvToJsonWorkerService.postMessage(reader.result as string)
    };
    reader.readAsText(file);
  }
}
