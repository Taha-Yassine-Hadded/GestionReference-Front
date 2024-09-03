import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SituationFamilialeService {


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

  getAllSituationsFamiliales(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/situations-familiales`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getSituationFamilialeById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/situations-familiales/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  createSituationFamiliale(situationFamiliale: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/situations-familiales`, situationFamiliale, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateSituationFamiliale(id: number, situationFamiliale: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/situations-familiales/${id}`, situationFamiliale, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteSituationFamiliale(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/situations-familiales/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
