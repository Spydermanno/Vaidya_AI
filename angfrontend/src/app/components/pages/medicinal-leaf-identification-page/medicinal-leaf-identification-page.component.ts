import { Component, OnInit } from '@angular/core';
import { UploadFileComponent } from '../../items/upload-file/upload-file.component';
import { ContainerComponent } from '../../layouts/container/container.component';
import { AnswersExpansionPanelComponent } from '../../items/expansion-panel/answers-expansion-panel/answers-expansion-panel.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Platform } from '@angular/cdk/platform';
import { catchError, finalize, throwError } from 'rxjs';
import { AnswerType, ResponseData } from '../../../modals';

@Component({
  selector: 'app-medicinal-leaf-identification-page',
  standalone: true,
  imports: [ UploadFileComponent, ContainerComponent, AnswersExpansionPanelComponent ],
  templateUrl: './medicinal-leaf-identification-page.component.html',
  styleUrl: './medicinal-leaf-identification-page.component.css'
})
export class MedicinalLeafIdentificationPageComponent implements OnInit {
  private readonly key = 'leaf-identification' as const;
  private readonly url = '/api/upload' as const;
  isLoading: boolean = false;
  file!: File;
  private filename!: string;
  protected commonSnackConfig: MatSnackBarConfig<any> = { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000 };
  answersData: AnswerType[] = [
    {
      title: "Basic Plant Details",
      description: ""
    },
    {
      title: "Disease Cureable",
      description: ""
    },
    {
      title: "Formulations for Certain Drugs",
      description: ""
    }
  ];

  constructor(private _snackBar: MatSnackBar, private _http: HttpClient, private _platform: Platform) { }

  ngOnInit(): void {
    if (!this._platform.isBrowser) return;
    const data = sessionStorage.getItem(this.key);
    if (!data) return;
    const result = JSON.parse(data);
    this.filename = result.file;
    this.answersData = result.answers;
  }

  getLeafData() {
    if (!this.file) {
      this._snackBar.open('Please select an Image.', '', { panelClass: [ '[&>div]:!bg-red-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
      return;
    };
    if (sessionStorage.hasOwnProperty(this.key) && this.filename === JSON.parse(sessionStorage.getItem(this.key)!).file) {
      this._snackBar.open('Already searched, check answers', '', { panelClass: [ '[&>div]:!bg-orange-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
      return;
    };
    this.setLoading(true);
    const formdata = new FormData();
    formdata.append("file", this.file);
    console.log(formdata.get('file'));
    this._http.post(this.url, formdata).pipe(catchError(this.handleError.bind(this)), finalize(() => this.setLoading(false))).subscribe(data => {
      const response = data as ResponseData;
      this.answersData[ 0 ].description = response.response1.replace('System: ', '');
      this.answersData[ 1 ].description = response.response2.replace('System: ', '');
      this.answersData[ 2 ].description = response.response3.replace('System: ', '');
      sessionStorage.setItem(this.key, JSON.stringify({ file: this.file.name, answers: this.answersData }));
      this._snackBar.open("Success, please check the answers.", '', { panelClass: [ '[&>div]:!bg-green-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
    });

  }

  onFileChange(file: File) {
    this.file = file;
    this.filename = file.name;
  }

  private setLoading(val: boolean) {
    this.isLoading = val;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    this._snackBar.open('Something bad happened, please try again later.', '', { panelClass: [ '[&>div]:!bg-red-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
