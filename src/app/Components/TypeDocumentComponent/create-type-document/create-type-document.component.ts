import { Component } from '@angular/core';
import {DevisesService} from "../../../Services/Devises/devises.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {TypeDocumentService} from "../../../Services/TypeDocument/type-document.service";

@Component({
  selector: 'app-create-type-document',
  templateUrl: './create-type-document.component.html',
  styleUrls: ['./create-type-document.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateTypeDocumentComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private typeDocumentService: TypeDocumentService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.typeDocumentService.create(this.formData).subscribe(
      () => {
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/typeDocument']);
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
          console.error('Erreur lors de la création du type document :', error);
        }
      }
    );
  }
}
