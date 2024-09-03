import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {


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

  createCategorie(data: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/create/categorie`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.apiURL}/getAll/categorie`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getCategorie(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/get/categorie/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCategorie(id: number, categorie: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/put/categorie/${id}`, categorie, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/delete/categorie/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error); // Renvoyer une observable d'erreur
  }
}
