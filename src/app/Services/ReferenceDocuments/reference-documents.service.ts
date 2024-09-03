import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReferenceDocumentsService {

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

  createRefDocument(refDocument: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/ref-documents`, refDocument, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getRefDocumentById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/ref-documents/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllRefDocument(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/getAll/ref-documents`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  updateRefDocument(id: number, refData: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/ref-documents/${id}`, refData, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteRefDocument(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/ref-documents/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }

}
