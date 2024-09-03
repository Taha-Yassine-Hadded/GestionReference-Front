import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private apiUrl = `${environment.apiURL}/upload`;

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${jwt}`
        })
      };
    } else {
      return {}; // Return an empty object if JWT token is not present
    }
  }

  uploadFile(file: File, projetPreuveId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projetPreuveId', projetPreuveId.toString());

    return this.http.post<any>(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            const total = event.total ?? 1;
            return { status: 'progress', message: Math.round(100 * event.loaded / total) };
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      }),
      catchError(this.handleError)
    );
  }

  getAllUploads(): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/uploads`, this.getHttpOptions()).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getUploadById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/upload/${id}`, this.getHttpOptions()).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteUpload(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/upload/${id}`, this.getHttpOptions()).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
