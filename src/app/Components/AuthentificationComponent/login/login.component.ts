import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class LoginComponent {
  credentials: any = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false; // Add property to remember me
  error: string | null = null;
  loginError: string = ''; // Variable to store the error message

  constructor(private authService: LoginService, private router: Router) { }

  login(): void {
    // Check if all fields are filled
    if (!this.credentials.email || !this.credentials.password) {
      console.error("All fields must be filled.");
      return;
    }

    // Call the login service if all fields are filled
    this.authService.login(this.credentials).subscribe(
      response => {
        // Si la connexion est réussie, stocker le token JWT localement
        // Vous pouvez également rediriger l'utilisateur vers une autre page
        console.log('Connexion réussie ! Username : ', response.username);
        const jwt = response.token; // Supposons que votre réponse contienne le JWT sous la clé "token"
        const username = response.username; // Supposons que votre réponse contienne le nom d'utilisateur sous la clé "username"
        const role = response.role;
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // Redirect the user to a specific page after login
        this.router.navigate(['/stat']); // Adjust the route as needed

      },
      error => {
        console.error(error);
        if (error.status === 401) {
          this.loginError = 'Incorrect email or password';
        } else {
          this.loginError = 'An error occurred. Please try again.';
        }
      }
    );
  }
}
