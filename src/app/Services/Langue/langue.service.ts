import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LangueService {
 

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
  

  getAllLangues(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/getAll/langues`, this.getHttpOptions());
  }

  getLangueById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/get/langue/${id}`, this.getHttpOptions());
  }

  createLangue(langue: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/create/langue`, langue, this.getHttpOptions());
  }

  updateLangue(id: number, langue: any): Observable<any> {
    return this.http.put<any>(`${environment.apiURL}/put/langue/${id}`, langue, this.getHttpOptions());
  }

  deleteLangue(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiURL}/delete/langue/${id}`, this.getHttpOptions());
  }
}
