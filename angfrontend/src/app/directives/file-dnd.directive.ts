import { Directive, HostBinding, HostListener, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Directive({
  selector: '[fileDnd]',
  standalone: true
})
export class FileDndDirective {
  @Output() private fileDropped: EventEmitter<FileList> = new EventEmitter();
  @HostBinding('class.fileover') fileOver!: boolean;
  private commonSnackConfig: MatSnackBarConfig<any> = { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000 };

  constructor(private _snackBar: MatSnackBar) { }
  @HostListener('dragover', [ '$event' ]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', [ '$event' ]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', [ '$event' ]) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer?.files;
    if (!files) {
      this.message('No files dropped');
      return;
    }
    if ((files as FileList).length > 1) {
      this.message('Only one file allowed');
      return;
    }
    if ((files as FileList).length === 0) {
      this.message('No files dropped');
      return;
    }
    let valid_file: FileList = files;
    this.fileDropped.emit(valid_file);
  }
  private message(message: string) {
    this._snackBar.open(message, '', { panelClass: [ '[&>div]:!bg-orange-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
  }
}
