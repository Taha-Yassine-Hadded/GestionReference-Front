import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LieuService {


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

  createLieu(lieuData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/lieu`,  lieuData , this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getAllLieux(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/lieux`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getLieuById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/lieux/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  getLieuxByPays(paysId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/lieux/byPays/${paysId}`);
  }
  updateLieu(id: number, lieuData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/lieu/${id}`, lieuData, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  deleteLieu(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/lieu/${id}`, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error); // Renvoyer une observable d'erreur
  }
}
