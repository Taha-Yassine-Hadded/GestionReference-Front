import { Component } from '@angular/core';
import {BailleurFondService} from "../../../Services/BailleurFond/bailleur-fond.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {
  EnvironnementDeveloppementService
} from "../../../Services/EnvironnementDeveloppement/environnement-developpement.service";

@Component({
  selector: 'app-create-environnement-developpement',
  templateUrl: './create-environnement-developpement.component.html',
  styleUrls: ['./create-environnement-developpement.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateEnvironnementDeveloppementComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private envDevService: EnvironnementDeveloppementService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.envDevService.create(this.formData).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/envDev']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Environnement déjà existant",
            text: "Cet environnement existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du environnement :', error);
        }
      }
    );
  }
}
