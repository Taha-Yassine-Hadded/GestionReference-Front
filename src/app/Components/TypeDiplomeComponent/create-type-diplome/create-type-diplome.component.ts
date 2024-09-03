import { Component } from '@angular/core';
import {RoleService} from "../../../Services/Role/role.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {TypeDiplomeService} from "../../../Services/TypeDiplome/type-diplome.service";

@Component({
  selector: 'app-create-type-diplome',
  templateUrl: './create-type-diplome.component.html',
  styleUrls: ['./create-type-diplome.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CreateTypeDiplomeComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private typeDiplomeService: TypeDiplomeService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.typeDiplomeService.create(this.formData).subscribe(
      () => {
        this.formData = {};
        this.router.navigate(['/typeDiplome']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Type diplome déjà existant",
            text: "Ce role existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du type diplome :', error);
        }
      }
    );
  }
}
