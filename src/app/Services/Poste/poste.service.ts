import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PosteService {


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
  
  createPoste(posteNom: string): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/postes`, { posteNom }, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getPoste(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/postes/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updatePoste(id: number, posteNom: string): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/postes/${id}`, { posteNom }, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deletePoste(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/postes/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getAllPostes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/postes`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
