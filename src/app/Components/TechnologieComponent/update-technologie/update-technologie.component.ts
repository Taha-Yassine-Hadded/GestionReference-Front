import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MethodologieService} from "../../../Services/Methodologie/methodologie.service";
import {TechnologieService} from "../../../Services/Technologie/technologie.service";

@Component({
  selector: 'app-update-technologie',
  templateUrl: './update-technologie.component.html',
  styleUrls: ['./update-technologie.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateTechnologieComponent {
  id!: number;
  formSubmitted: boolean = false;
  technologieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private technologieService : TechnologieService,
    private router: Router
  ) {
    this.technologieForm = this.formBuilder.group({
      referenceTechnologieLibelle: ['', Validators.required],
      referenceTechnologieDescription: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadTechnologie(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.technologieForm.valid) {
      const formData = this.technologieForm.value;

      this.technologieService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Technologie mis à jour avec succès:', response);
            this.router.navigate(['/technologie']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du technologie:', error);
          }
        );
    }
  }

  loadTechnologie(id: number): void {
    this.technologieService.getById(id).subscribe(
      (data: any) => {
        console.log(data);
        // Patch des valeurs individuelles dans le formulaire
        this.technologieForm.patchValue({
          referenceTechnologieLibelle: data.referenceTechnologieLibelle,
          referenceTechnologieDescription: data.referenceTechnologieDescription
        });
      },
      error => {
        console.log('Erreur lors du chargement du technologie:', error);
      }
    );
  }
}
