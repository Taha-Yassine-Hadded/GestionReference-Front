import { Component } from '@angular/core';
import {TypeDocumentService} from "../../../Services/TypeDocument/type-document.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {CvLangueNiveauService} from "../../../Services/CvLangueNiveau/cv-langue-niveau.service";

@Component({
  selector: 'app-create-cv-langue-niveau',
  templateUrl: './create-cv-langue-niveau.component.html',
  styleUrls: ['./create-cv-langue-niveau.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateCvLangueNiveauComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private cvLangueNiveauService: CvLangueNiveauService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.cvLangueNiveauService.create(this.formData).subscribe(
      () => {
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/cvLangueNiveau']);
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
