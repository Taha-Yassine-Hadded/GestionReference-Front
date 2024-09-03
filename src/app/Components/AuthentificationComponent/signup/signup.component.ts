import { Component } from '@angular/core';
import { SignUpService } from 'src/app/Services/SignUpService/sign-up.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class SignupComponent {
  userData: any = {
    email: '',
    password: '',
    username: ''
  };
accountCreated: boolean = false;
  constructor(private signUpService: SignUpService) { }

  signUp(): void {
    // Vérifier si tous les champs sont remplis
    if (!this.userData.email || !this.userData.username || !this.userData.password ) {
      // Afficher un message d'erreur ou une notification indiquant que tous les champs doivent être remplis
      console.error("Tous les champs doivent être remplis.");
      return; // Arrêter l'exécution de la fonction si un champ est vide
    }
  
    // Si tous les champs sont remplis, appeler le service d'inscription
    this.signUpService.signUp(this.userData).subscribe(
      response => {
        console.log(response);
        this.accountCreated = true;
        // Traitez la réponse ici si nécessaire
      },
      error => {
        console.error(error);
        // Gérez les erreurs ici si nécessaire
      }
    );
  }
  

}
