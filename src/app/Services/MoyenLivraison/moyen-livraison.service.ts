import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MoyenLivraisonService {

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

  getAllMoyensLivraison(): Observable<any[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any[]>(`${environment.apiURL}/getAll/moyen-livraisons`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createMoyenLivraison(moyenLivraison: string): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<any>(`${environment.apiURL}/create/moyen-livraisons`, moyenLivraison, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMoyenLivraison(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any>(`${environment.apiURL}/get/moyen-livraisons/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMoyenLivraison(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(`${environment.apiURL}/delete/moyen-livraisons/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMoyenLivraison(id: number, moyenLivraison: string): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<any>(`${environment.apiURL}/put/moyen-livraisons/${id}`, { moyenLivraison }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
