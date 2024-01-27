import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Input, Output, EventEmitter, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileDndDirective } from '../../../directives/file-dnd.directive';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [ CommonModule, MatProgressBarModule, FileDndDirective, MatProgressSpinner ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent implements OnDestroy {
  files: any[] = [];
  @Output() fileChange: EventEmitter<File> = new EventEmitter();
  @Input() isLoading: boolean = false;
  @Input() commonSnackConfig!: MatSnackBarConfig<any>;
  @Output() search = new EventEmitter<void>();


  constructor(private _snackBar: MatSnackBar) { }

  onSearch() {
    this.search.emit();
  }

  onFileClick(event: Event) {
    (event.target as HTMLInputElement).value = '';
  }

  onFileDropped(file: any) {
    this.prepareFilesList(file);
  }

  fileBrowseHandler(event: Event) {
    const files = Array.from((event.target as HTMLInputElement)?.files || []);
    this.prepareFilesList(files);
  }

  deleteFile(index: number) {
    URL.revokeObjectURL(this.files[ 0 ].preview);
    this.files.splice(index, 1);
  }

  prepareFilesList(files: Array<any>) {
    if (this.files.length === 1) {
      this._snackBar.open('Please Upload Single Image', '', { panelClass: [ '[&>div]:!bg-orange-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
      return;
    }
    for (const item of files) {
      if (!this.checkFileTypeIsImage(item)) {
        this._snackBar.open('File type must be Image!!!', '', { panelClass: [ '[&>div]:!bg-orange-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
        return;
      }
      item.preview = URL.createObjectURL(item);
      this.files.push(item);
      this.fileChange.emit(item);
      // console.log(item);
      this._snackBar.open('Image Uploaded', '', { panelClass: [ '[&>div]:!bg-green-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
    }
  }

  formatBytes(bytes: number, decimals: number = 0) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[ i ];
  }

  private checkFileTypeIsImage(file: File) {
    return /^image\/(jpeg|png|gif|bmp)$/.test(file.type);
  }

  ngOnDestroy(): void {
    this.files.forEach(file => URL.revokeObjectURL(file.preview));
  }
}
