import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class RapportService {
  constructor(private http: HttpClient) { }

  downloadPdf(id: number): Observable<Blob> {
    const url = `${environment.apiURL}/rapportpdf/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/pdf'
    });

    return this.http.get(url, {
      responseType: 'blob',
      headers: headers
    });
  }
  downloadWord(id: number): Observable<Blob> {
    const url = `${environment.apiURL}/rapportword/${id}`;
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    return this.http.get(url, {
      responseType: 'blob',
      headers: headers
    });
  }

  downloadRapport(id: number): Observable<Blob> {
    const url = `${environment.apiURL}/rapport/${id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  generatePdf(id: number): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(`${environment.apiURL}/etat/appel-offres/${id}`, { headers: headers, responseType: 'blob' });
  }

  generatePdfs(referenceIds: number[]): Observable<Blob> {
    return this.http.post(`${environment.apiURL}/rapportpdf/all`, { referenceIds }, { responseType: 'blob' });
  }
  generateWordReports(referenceIds: number[]): Observable<Blob> {
    return this.http.post(`${environment.apiURL}/rapportword/all`, { referenceIds }, { responseType: 'blob' });
  }
}