import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

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
      // Retourner un objet vide si jwt n'est pas présent
      return {};
    }
  }

  createProjet(projetData: any): Observable<any> {
    return this.http.post(`${environment.apiURL}/create/projet`, projetData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllProjets(): Observable<any> {
    return this.http.get(`${environment.apiURL}/getAll/projets`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjetById(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/get/projet/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjetByIdOne(id: number): Observable<any> {
    return this.http.get(`${environment.apiURL}/getOne/projet/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProjet(id: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}/delete/projet/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProjet(id: number, projetData: any): Observable<any> {
    return this.http.put(`${environment.apiURL}/edit/projet/${id}`, projetData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    // Gérer les erreurs ici
    return throwError(error);
  }

}
