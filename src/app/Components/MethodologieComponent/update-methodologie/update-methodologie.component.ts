import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MethodologieService} from "../../../Services/Methodologie/methodologie.service";

@Component({
  selector: 'app-update-methodologie',
  templateUrl: './update-methodologie.component.html',
  styleUrls: ['./update-methodologie.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateMethodologieComponent {
  id!: number;
  formSubmitted: boolean = false;
  methodologieForm: FormGroup;
  pays: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private methodologieService : MethodologieService,
    private router: Router
  ) {
    this.methodologieForm = this.formBuilder.group({
      methodologieLibelle: ['', Validators.required],
      methodologieDescription: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadMethodologie(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.methodologieForm.valid) {
      const formData = this.methodologieForm.value;

      this.methodologieService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Methodologie mis à jour avec succès:', response);
            this.router.navigate(['/methodologie']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du methodologie:', error);
          }
        );
    }
  }

  loadMethodologie(id: number): void {
    this.methodologieService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.methodologieForm.patchValue({
          methodologieLibelle: data.methodologieLibelle,
          methodologieDescription: data.methodologieDescription
        });
      },
      error => {
        console.log('Erreur lors du chargement du methodologie:', error);
      }
    );
  }
}
