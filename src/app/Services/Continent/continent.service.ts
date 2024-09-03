import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment.development";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContinentService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/continent`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(error);
  }
}
