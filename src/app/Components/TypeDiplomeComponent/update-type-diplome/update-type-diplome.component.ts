import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../Services/Role/role.service";
import {TypeDiplomeService} from "../../../Services/TypeDiplome/type-diplome.service";

@Component({
  selector: 'app-update-type-diplome',
  templateUrl: './update-type-diplome.component.html',
  styleUrls: ['./update-type-diplome.component.css', '../../../../assets/css/bootstrap.min.css']

})
export class UpdateTypeDiplomeComponent {
  id!: number;
  typeForm: FormGroup;
  formSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private typeDiplomeService : TypeDiplomeService,
    private router: Router
  ) {
    this.typeForm = this.formBuilder.group({
      typeDiplomeLibelle: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadType(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.typeForm.valid) {
      const formData = this.typeForm.value;

      this.typeDiplomeService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Type diplome mis à jour avec succès:', response);
            this.router.navigate(['/typeDiplome']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du type diplome:', error);
          }
        );
    }
  }

  loadType(id: number): void {
    this.typeDiplomeService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.typeForm.patchValue({
          typeDiplomeLibelle: data.typeDiplomeLibelle
        });
      },
      error => {
        console.log('Erreur lors du chargement du type diplome:', error);
      }
    );
  }
}
