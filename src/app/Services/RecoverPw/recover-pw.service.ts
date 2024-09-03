import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecoverPwService {



  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string) {
    const url = `${environment.apiURL}/forgot-password`;
    return this.http.post<any>(url, { email });
  }

  resetPassword(token: string, newPassword: string) {
    const resetPasswordUrl = `${environment.apiURL}/reset-password/${token}`;
    return this.http.post<any>(resetPasswordUrl, { newPassword });
  }

}
