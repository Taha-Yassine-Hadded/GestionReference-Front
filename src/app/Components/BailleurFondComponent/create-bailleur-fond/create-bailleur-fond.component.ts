import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { BailleurFondService } from "../../../Services/BailleurFond/bailleur-fond.service";

@Component({
  selector: 'app-create-bailleur-fond',
  templateUrl: './create-bailleur-fond.component.html',
  styleUrls: ['./create-bailleur-fond.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateBailleurFondComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private bailleurFondService: BailleurFondService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.bailleurFondService.create(this.formData).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/bailleurFond']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Bailleur fond déjà existant",
            text: "Ce bailleur fond existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du lieu :', error);
        }
      }
    );
  }
}
