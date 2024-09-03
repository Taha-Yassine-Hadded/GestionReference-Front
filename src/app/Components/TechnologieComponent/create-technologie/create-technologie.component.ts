import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {TechnologieService} from "../../../Services/Technologie/technologie.service";

@Component({
  selector: 'app-create-technologie',
  templateUrl: './create-technologie.component.html',
  styleUrls: ['./create-technologie.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateTechnologieComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private technologieService: TechnologieService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.technologieService.create(this.formData).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/technologie']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Technologie déjà existant",
            text: "Cette technologie existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du technologie :', error);
        }
      }
    );
  }
}
