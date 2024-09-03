import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css','../../../../assets/css/bootstrap.min.css']
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: LoginService, private router: Router) { }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Les nouveaux mots de passe ne correspondent pas.';
      return;
    }
  
    // Récupérer le token d'authentification depuis le service
    const token = this.userService.getAuthToken();
  
    // Vérifier si un jeton est disponible
    if (!token) {
      this.errorMessage = 'Veuillez vous connecter pour changer votre mot de passe.';
      return;
    }
  
    // Appeler la fonction changePassword du service avec les anciens et nouveaux mots de passe
    this.userService.changePassword(this.oldPassword, this.newPassword)
      .subscribe(
        (response) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';

          // Supprimer le token JWT du localStorage
          this.userService.removeToken();

          // Redirection vers la page de connexion après un délai de 2 secondes
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 2000);
        },
        (error) => {
          this.errorMessage = error.error.error || 'Une erreur s\'est produite lors du changement de mot de passe.';
          this.successMessage = '';
        }
      );
  }
}
