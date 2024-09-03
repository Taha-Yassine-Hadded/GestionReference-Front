import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NatureClientService {
  

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
  
  createNatureClient(natureClient: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/nature-clients`, natureClient, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getAllNatureClients(): Observable<any> {
    return this.http.get(`${environment.apiURL}/nature-clients`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getNatureClientById(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/nature-clients/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  updateNatureClient(id: number, natureClient: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/nature-clients/${id}`, natureClient, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteNatureClient(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/nature-clients/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
