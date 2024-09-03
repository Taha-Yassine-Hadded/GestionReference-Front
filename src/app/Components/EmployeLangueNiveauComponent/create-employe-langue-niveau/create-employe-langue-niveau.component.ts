import { Component } from '@angular/core';
import {CvLangueNiveauService} from "../../../Services/CvLangueNiveau/cv-langue-niveau.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {EmployeLangueNiveauService} from "../../../Services/EmployeLangueNiveau/employe-langue-niveau.service";

@Component({
  selector: 'app-create-employe-langue-niveau',
  templateUrl: './create-employe-langue-niveau.component.html',
  styleUrls: ['./create-employe-langue-niveau.component.css' ,'../../../../assets/css/bootstrap.min.css']
})
export class CreateEmployeLangueNiveauComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private employeLangueNiveauService: EmployeLangueNiveauService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.employeLangueNiveauService.create(this.formData).subscribe(
      () => {
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/employeLangueNiveau']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Langue niveau déjà existant",
            text: "Ce niveau existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du langue niveau :', error);
        }
      }
    );
  }
}
