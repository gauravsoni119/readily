import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CsvToJsonWorkerService } from '@readily/shared/webworkers';

@Component({
  selector: 'readily-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @ViewChild('file', { static: true }) private filesRef: ElementRef<HTMLInputElement> | undefined;
  constructor(private readonly csvToJsonWorkerService: CsvToJsonWorkerService) { }

  ngOnInit(): void {
    this.csvToJsonWorkerService.message$.subscribe(data => {
      console.log('data received', data);
    });
  }

  readFile() {
    if (this.filesRef) {
      const files = this.filesRef.nativeElement.files;
      if (files) {
        const reader = new FileReader();
        reader.onload = () => {
          console.log(this.csvToJsonWorkerService.postMessage(reader.result as string));
        };
        console.log(files[0]);
        reader.readAsText(files[0]);
      }

    }
  }
}
