import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppelOffreService {

 

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        })
      };
    } else {
      return {};
    }
  }

  createAppelOffre(data: any): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<any>(`${environment.apiURL}/create/appel-offres`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getOneAppelOffre(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any>(`${environment.apiURL}/getOne/appel-offres/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAppelOffre(id: number, data: any): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<any>(`${environment.apiURL}/put/appel-offres/${id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAppelOffreById(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any>(`${environment.apiURL}/get/appel-offres/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAppelOffre(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete<any>(`${environment.apiURL}/delete/appel-offres/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllAppelOffres(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any>(`${environment.apiURL}/getAll/appelOffres`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

 

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
