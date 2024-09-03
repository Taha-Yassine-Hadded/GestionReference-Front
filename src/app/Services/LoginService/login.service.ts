import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/login`, credentials);
  }

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

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    const options = this.getHttpOptions();
    return this.http.post<any>(`${environment.apiURL}/changePassword`, data, options);
  }

  storeToken(token: string, role: string, username: string): void {
    console.log('Storing token:', token);
    console.log('Storing role:', role);
    console.log('Storing username:', username);
  
    localStorage.setItem('jwt', token);
    localStorage.setItem('username', username);
    localStorage.setItem('role', role); // Store the role using a consistent key and value
  }
  
  isLoggedIn(): boolean {
    const jwt = localStorage.getItem('jwt');
    console.log('isLoggedIn:', jwt !== null); // Ajoutez cette ligne pour vérifier la connexion
    return jwt !== null;
  }
// login.service.ts
isAdmin(): boolean {
  const role = localStorage.getItem('role');
  console.log('isAdmin Role:', role); // Ajoutez cette ligne pour vérifier le rôle
  return role === 'ROLE_ADMIN'; // Assurez-vous que la comparaison correspond au rôle attendu
}


  isUser(): boolean {
    // Récupérez le rôle de l'utilisateur à partir du jeton d'authentification ou de toute autre source
    const role = localStorage.getItem('role');
    return role === 'user'; // Vérifiez si l'utilisateur a le rôle d'administrateur
  }
  getAuthToken(): string | null {
    return localStorage.getItem('jwt');
  }

  removeToken(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  forgotPassword(email: string): Observable<any> {
    const data = { email: email };
    return this.http.post<any>(`${environment.apiURL}/forgot-password`, data);
  }
  // Méthode pour récupérer les informations de l'utilisateur connecté
  getProfile(): Observable<any> {
    // Retrieve the JWT token from local storage
    const jwt = localStorage.getItem('jwt');

    // Check if the token is present
    if (!jwt) {
      throw new Error('No token available');
    }

    // Set the authorization header with the JWT token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    
    // Send the HTTP request to fetch the user profile
    return this.http.get<any>(`${environment.apiURL}/profile`, { headers });
  }
}
