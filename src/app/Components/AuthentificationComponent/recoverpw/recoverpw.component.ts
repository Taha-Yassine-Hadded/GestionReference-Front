import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/LoginService/login.service';

@Component({
  selector: 'app-recoverpw',
  templateUrl: './recoverpw.component.html',
  styleUrls: ['./recoverpw.component.css',
  '../../../../assets/css/bootstrap.min.css'
 
]
})
export class RecoverpwComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = ''; // Déclaration de la propriété errorMessage
  successMessage: string = ''; // Déclaration de la propriété successMessage

  constructor(private passwordService: LoginService) { }

  onSubmit(): void {
    this.passwordService.forgotPassword(this.email)
      .subscribe(
        response => {
          this.message = response.message;
          this.successMessage = response.message; // Assigner le message de succès
          this.errorMessage = ''; // Réinitialiser le message d'erreur
        },
        error => {
          console.error('Error:', error);
          this.errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.'; // Message d'erreur générique
          this.successMessage = ''; // Réinitialiser le message de succès
        }
      );
  }
}
