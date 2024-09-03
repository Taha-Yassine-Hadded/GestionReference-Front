import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {


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

  getAllReferences(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/references`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getReferenceById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/reference/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getOneReferenceById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/getOne/reference/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  createReference(referenceData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/reference`, referenceData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateReference(id: number, referenceData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/edit/reference/${id}`, referenceData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteReference(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/reference/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
