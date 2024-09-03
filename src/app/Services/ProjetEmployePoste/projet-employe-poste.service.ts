import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjetEmployePosteService {
 
  constructor(private http: HttpClient) { }
  private getHttpOptions(): { headers: HttpHeaders } {
    const jwt = localStorage.getItem('jwt');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (jwt) {
      headers = headers.set('Authorization', `Bearer ${jwt}`);
    }
    return { headers };
  }

  getAllProjetEmployePostes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/projet-employe-poste`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getProjetEmployePosteById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/getOne/projet-employe-poste/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  createProjetEmployePoste(projetEmployePosteData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/projet-employe-poste`, projetEmployePosteData, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateProjetEmployePoste(id: number, projetEmployePosteData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/projet-employe-poste/${id}`, projetEmployePosteData, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteProjetEmployePoste(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/projet-employe-poste/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}