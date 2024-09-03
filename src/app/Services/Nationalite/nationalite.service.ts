import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NationaliteService {


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
  
  getAllNationalites(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/nationalites`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getNationaliteById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/nationalite/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  createNationalite(nationalite: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/nationalite`, nationalite, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateNationalite(id: number, nationalite: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/nationalite/${id}`, nationalite, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteNationalite(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/nationalite/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
