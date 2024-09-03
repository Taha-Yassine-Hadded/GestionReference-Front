import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StaticsService {
 

  constructor(private http: HttpClient) { }

  getEmployeesStatistics(): Observable<any> {
    return this.http.get(`${environment.apiURL}/statistics/employees`);
  }

  getProjectsStatistics(): Observable<any> {
    return this.http.get(`${environment.apiURL}/statistics/projects`);
  }

  getClientsStatistics(): Observable<any> {
    return this.http.get(`${environment.apiURL}/statistics/clients`);
  }

  getAppelsOffresStatistics(): Observable<any> {
    return this.http.get(`${environment.apiURL}/statistics/AppeslOffres`);
  }
  getParticipationParPays(): Observable<any> {
    return this.http.get(`${environment.apiURL}/pourcentage-participation-par-pays`);

}
getParticipationParLieux(): Observable<any> {
  return this.http.get(`${environment.apiURL}/pourcentage-participation-par-lieu`);

}
getHistogram(): Observable<any> {
  return this.http.get(`${environment.apiURL}/participation-stats`);

}  

}