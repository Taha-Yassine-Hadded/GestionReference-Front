import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {RoleService} from "../../../Services/Role/role.service";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateRoleComponent {
  formData: any = {};
  formSubmitted: boolean = false;

  constructor(private roleService: RoleService, private router: Router) { }

  onSubmit(form: NgForm): void {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.roleService.create(this.formData).subscribe(
      () => {
        this.formData = {};
        this.router.navigate(['/role']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Role déjà existant",
            text: "Ce role existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du role :', error);
        }
      }
    );
  }
}
