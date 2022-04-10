import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fileTypeValidator } from '@readily/shared/utils';

@Component({
  selector: 'readily-file-uploader',
  templateUrl: './file-uploader.component.html',
  styles: [`:host {display: block}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {

  @Input() loading = false;

  @Output() fileUpload: EventEmitter<File> = new EventEmitter();

  fileControl = new FormControl('', fileTypeValidator('csv'));

  constructor(private readonly snackbar: MatSnackBar) { }

  onDrop(file: File): void {
    this.handleFile(file);
  }

  onUpload(event: Event): void {
    if (event) {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        this.handleFile(files[0]);
      }
    }
  }

  private handleFile(file: File): void {
    this.fileControl.setValue(file);
    if (this.fileControl.valid) {
      this.fileUpload.emit(file);
    } else {
      this.snackbar.open('Please provide valid file.', 'close', { duration: 5000 });
    }
  }

}
