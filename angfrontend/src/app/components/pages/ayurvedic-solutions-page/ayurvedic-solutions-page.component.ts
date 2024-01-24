import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContainerComponent } from '../../layouts/container/container.component';
import { Platform } from '@angular/cdk/platform';

declare var sessionStorage: Storage;
interface ResponseData {
  response1: string;
  response2: string;
  response3: string;
}
interface AnswerType {
  title: string;
  description: string;
}
@Component({
  selector: 'app-ayurvedic-solutions-page',
  standalone: true,
  imports: [ MatIconModule, MatButton, CommonModule, MatProgressSpinnerModule, MatExpansionModule, ContainerComponent ],
  templateUrl: './ayurvedic-solutions-page.component.html',
  styleUrl: './ayurvedic-solutions-page.component.css'
})
export class AyurvedicSolutionsPageComponent implements OnInit {
  readonly key = 'ayurvedic-solutions' as const;
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


  constructor(private http: HttpClient, private _platform: Platform) { }

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
    if (sessionStorage.hasOwnProperty(this.key) && this.inputString === JSON.parse(sessionStorage.getItem(this.key)!).symptom) return;
    this.setLoading(true);
    this.http.post('http://localhost:5000/disease', { disease: this.inputString }).pipe(catchError(this.handleError), finalize(() => this.setLoading(false))).subscribe(data => {
      const response = data as ResponseData;
      this.answersData[ 0 ].description = response.response1.replace('System: ', '');
      this.answersData[ 1 ].description = response.response2.replace('System: ', '');
      this.answersData[ 2 ].description = response.response3.replace('System: ', '');
      sessionStorage.setItem(this.key, JSON.stringify({ symptom: this.inputString, answers: this.answersData }));
      this.setLoading(true);
    });
  }

  private setLoading(val: boolean) {
    this.isLoading = val;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
