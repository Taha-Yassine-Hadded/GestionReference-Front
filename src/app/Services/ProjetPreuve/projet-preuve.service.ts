import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjetPreuveService {
 

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

  getAllProjetPreuves(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/projet-preuves`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getAllProjets(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/projets`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  createProjetPreuve(projetPreuveData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/projet-preuves`, projetPreuveData, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getProjetPreuveById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/projet-preuves/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateProjetPreuve(id: number, projetPreuveData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/projet-preuves/${id}`, projetPreuveData, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteProjetPreuve(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/projet-preuves/${id}`, this.getHttpOptions()).pipe(
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
