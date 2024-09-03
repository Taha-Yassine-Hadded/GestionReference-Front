import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaysService {


  constructor(private http: HttpClient) { }

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
  
  createPays(paysData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/pays`, paysData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getPaysById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/pays/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllPays(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/getAll/pays`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePays(id: number, paysData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/pays/${id}`, paysData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePays(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/pays/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
