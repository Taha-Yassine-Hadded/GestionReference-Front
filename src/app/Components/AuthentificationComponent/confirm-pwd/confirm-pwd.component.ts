// src/app/Components/AuthentificationComponent/confirm-pwd/confirm-pwd.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm-pwd',
  templateUrl: './confirm-pwd.component.html',
  styleUrls: ['./confirm-pwd.component.css']
})
export class ConfirmPwdComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  token!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Assigner une valeur par défaut vide si le token est null
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid && this.resetPasswordForm.value.password === this.resetPasswordForm.value.confirmPassword) {
      this.http.post('http://localhost:8000/api/update-password', {
        token: this.token,
        newPassword: this.resetPasswordForm.value.password
      }).subscribe(response => {
        console.log('Password reset successfully');
        this.router.navigate(['/login']); // Rediriger vers la page de connexion
      }, error => {
        console.error('Password reset failed', error);
      });
    }
  }
}
