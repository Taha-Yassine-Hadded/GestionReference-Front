import { Component } from '@angular/core';
import {BailleurFondService} from "../../../Services/BailleurFond/bailleur-fond.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {MethodologieService} from "../../../Services/Methodologie/methodologie.service";

@Component({
  selector: 'app-create-methodologie',
  templateUrl: './create-methodologie.component.html',
  styleUrls: ['./create-methodologie.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateMethodologieComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private methodologieService: MethodologieService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.methodologieService.create(this.formData).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/methodologie']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Methodologie déjà existant",
            text: "Methodologie existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création de methodologie :', error);
        }
      }
    );
  }
}
