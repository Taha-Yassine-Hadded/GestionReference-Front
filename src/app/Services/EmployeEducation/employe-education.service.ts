import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeEducationService {



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

  getAllEmployeEducations(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/employeeducation`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeEducation(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/employeeducation/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createEmployeEducation(employeEducationData: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/employeeducation`, employeEducationData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployeEducation(id: number, employeEducationData: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/employeeducation/${id}`, employeEducationData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmployeEducation(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/employeeducation/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmploye(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/employeeducation/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
