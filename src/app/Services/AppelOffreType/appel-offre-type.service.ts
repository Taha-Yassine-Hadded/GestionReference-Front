import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppelOffreTypeService {
  
  

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

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error); // Renvoyer une observable d'erreur
  }
  
  getAppelOffreTypes(): Observable<any[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any[]>(`${environment.apiURL}/getAll/appeloffre/types`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAppelOffreType(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get(`${environment.apiURL}/get/appeloffre/types/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createAppelOffreType(appelOffreType: string): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<any>(`${environment.apiURL}/create/appeloffre/types`, { appelOffreType }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAppelOffreType(id: number, newData: any): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<any>(`${environment.apiURL}/put/appeloffre/types/${id}`, newData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAppelOffreType(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(`${environment.apiURL}/delete/appeloffre/types/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
