import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EnvironnementDeveloppementService {

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

  create(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/environnementdeveloppement`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/environnementdeveloppement/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/environnementDeveloppements`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/environnementdeveloppement/${id}`, data, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/environnementdeveloppement/${id}`, this.getHttpOptions())
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
