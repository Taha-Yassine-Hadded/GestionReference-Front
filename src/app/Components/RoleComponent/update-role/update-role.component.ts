import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../Services/Role/role.service";

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateRoleComponent {
  id!: number;
  roleForm: FormGroup;
  formSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private roleService : RoleService,
    private router: Router
  ) {
    this.roleForm = this.formBuilder.group({
      roleLibelle: ['', Validators.required],
      roleShort: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadRole(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;

      this.roleService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Role mis à jour avec succès:', response);
            this.router.navigate(['/role']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du role:', error);
          }
        );
    }
  }

  loadRole(id: number): void {
    this.roleService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.roleForm.patchValue({
          roleLibelle: data.roleLibelle,
          roleShort: data.roleShort
        });
      },
      error => {
        console.log('Erreur lors du chargement du role:', error);
      }
    );
  }
}
