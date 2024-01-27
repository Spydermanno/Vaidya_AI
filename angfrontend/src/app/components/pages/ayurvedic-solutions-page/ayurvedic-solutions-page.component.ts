import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Platform } from '@angular/cdk/platform';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AnswersExpansionPanelComponent } from '../../items/expansion-panel/answers-expansion-panel/answers-expansion-panel.component';
import { AnswerType, ResponseData } from '../../../modals';

declare var sessionStorage: Storage;

@Component({
  selector: 'app-ayurvedic-solutions-page',
  standalone: true,
  imports: [ MatIconModule, MatButton, CommonModule, MatProgressSpinnerModule, AnswersExpansionPanelComponent ],
  templateUrl: './ayurvedic-solutions-page.component.html',
  styleUrl: './ayurvedic-solutions-page.component.css'
})
export class AyurvedicSolutionsPageComponent implements OnInit {
  private readonly key = 'ayurvedic-solutions' as const;
  private readonly url = '/api/disease' as const;
  inputString: string = '';
  answersData: AnswerType[] = [
    {
      title: "Drugs to cure it",
      description: ""
    },
    {
      title: "Formulations",
      description: ""
    },
    {
      title: "Precaution for taking drugs",
      description: ""
    }
  ];
  isLoading: boolean = false;
  private commonSnackConfig: MatSnackBarConfig<any> = { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000 };


  constructor(private _http: HttpClient, private _platform: Platform, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this._platform.isBrowser) return;
    const data = sessionStorage.getItem(this.key);
    if (!data) return;
    const result = JSON.parse(data);
    this.inputString = result.symptom;
    this.answersData = result.answers;
  }

  setInputString(event: Event) {
    this.inputString = (event.target as HTMLInputElement).value;
  }

  getAyurvedicSolutions() {
    if (this.inputString === '') return;
    if (sessionStorage.hasOwnProperty(this.key) && this.inputString === JSON.parse(sessionStorage.getItem(this.key)!).symptom) {
      this._snackBar.open('Already searched, check answers', '', { panelClass: [ '[&>div]:!bg-orange-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
      return;
    };
    this.setLoading(true);
    this._http.post(this.url, { disease: this.inputString }).pipe(catchError(this.handleError.bind(this)), finalize(() => this.setLoading(false))).subscribe(data => {
      const response = data as ResponseData;
      this.answersData[ 0 ].description = response.response1.replace('System: ', '');
      this.answersData[ 1 ].description = response.response2.replace('System: ', '');
      this.answersData[ 2 ].description = response.response3.replace('System: ', '');
      sessionStorage.setItem(this.key, JSON.stringify({ symptom: this.inputString, answers: this.answersData }));
      this._snackBar.open("Success, please check the answers.", '', { panelClass: [ '[&>div]:!bg-green-400', 'font-medium', 'text-lg', 'text-center' ], ...this.commonSnackConfig });
    });
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
