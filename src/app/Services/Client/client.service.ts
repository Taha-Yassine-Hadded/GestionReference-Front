import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


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

  getAllClients(): Observable<any> {
    return this.http.get(`${environment.apiURL}/getAll/clients`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }
  getClientInfo(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/getOne/client/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getClient(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/get/client/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/create/clients`, client, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateClient(id: number, client: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/update/client/${id}`, client, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/delete/client/${id}`, this.getHttpOptions()).pipe(
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
