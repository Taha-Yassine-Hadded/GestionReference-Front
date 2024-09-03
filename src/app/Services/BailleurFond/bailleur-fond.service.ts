import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class BailleurFondService {
  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(`${environment.apiURL}/bailleurfond`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/bailleurfond/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/getAll/bailleurFonds`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/bailleurfond/${id}`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/bailleurfond/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
