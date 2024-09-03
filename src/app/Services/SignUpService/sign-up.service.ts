import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

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

  signUp(userData: any): Observable<any> {
    const url = `${environment.apiURL}/userCreate`;
    return this.http.post<any>(url, userData).pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/users`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/users/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // Gérer les erreurs ici
    return throwError(error);
  }

}
