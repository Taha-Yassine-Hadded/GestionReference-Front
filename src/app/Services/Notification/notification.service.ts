import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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

  generateNotifications() {
    return this.http.get<any>(`${environment.apiURL}/notifications`, this.getHttpOptions());
  }

  getUnreadNotificationCount() {
    return this.http.get<any>(`${environment.apiURL}/notifications/unread-count`, this.getHttpOptions());
  }

  getNotifications() {
    return this.http.get<any>(`${environment.apiURL}/notifications/all`, this.getHttpOptions());
  }
  logout() {
    // Make a POST request to the logout endpoint
    return this.http.post<any>(`${environment.apiURL}/logout`, {});
  }
}
