import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) {
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        })
      };
    } else {
      return { headers: new HttpHeaders() };
    }
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/employe`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/employe/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }


  getDetails(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/employe/details/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/employe`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/employe/${id}`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/employe/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
