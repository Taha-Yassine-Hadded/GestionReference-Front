import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {DevisesService} from "../../../Services/Devises/devises.service";

@Component({
  selector: 'app-create-devises',
  templateUrl: './create-devises.component.html',
  styleUrls: ['./create-devises.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateDevisesComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private devisesService: DevisesService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.devisesService.create(this.formData).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/devises']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Devise déjà existant",
            text: "Ce devises existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du devise :', error);
        }
      }
    );
  }
}
