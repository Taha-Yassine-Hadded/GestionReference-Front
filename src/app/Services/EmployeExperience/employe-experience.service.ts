import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeExperienceService {


  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        })
      };
    } else {
      return {};
    }
  }

  getAllEmployeExperiences(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/employeexperience`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeExperience(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/employeexperience/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createEmployeExperience(experienceData: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/employeexperience`, experienceData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployeExperience(id: number, experienceData: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/employeexperience/${id}`, experienceData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmployeExperience(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/employeexperience/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
