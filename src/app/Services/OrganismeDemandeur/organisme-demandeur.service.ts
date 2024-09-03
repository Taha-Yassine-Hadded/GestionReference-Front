import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrganismeDemandeurService {



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
      // Retourner un objet avec des headers vides si le JWT n'est pas présent
      return { headers: new HttpHeaders() };
    }
  }

  createOrganismeDemandeur(organismeDemandeurLibelle: string): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<any>(`${environment.apiURL}/create/organisme-demandeurs`,  organismeDemandeurLibelle , httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }

  getAllOrganismesDemandeurs(): Observable<any[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any[]>(`${environment.apiURL}/getAll/organisme-demandeurs`, httpOptions);
  }

  getOrganismeDemandeur(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any>(`${environment.apiURL}/get/organisme-demandeurs/${id}`, httpOptions);
  }

  updateOrganismeDemandeur(id: number, organismeDemandeurLibelle: string): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<any>(`${environment.apiURL}/put/organisme-demandeurs/${id}`, organismeDemandeurLibelle , httpOptions);
  }

  deleteOrganismeDemandeur(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete<any>(`${environment.apiURL}/delete/organisme-demandeurs/${id}`, httpOptions);
  }
}
