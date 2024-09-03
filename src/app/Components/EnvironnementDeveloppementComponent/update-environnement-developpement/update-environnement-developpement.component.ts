import { Component } from '@angular/core';
import {
  EnvironnementDeveloppementService
} from "../../../Services/EnvironnementDeveloppement/environnement-developpement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-environnement-developpement',
  templateUrl: './update-environnement-developpement.component.html',
  styleUrls: ['./update-environnement-developpement.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateEnvironnementDeveloppementComponent {
  id!: number;
  formSubmitted: boolean = false;
  envForm: FormGroup;
  pays: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private envDevService : EnvironnementDeveloppementService,
    private router: Router
  ) {
    this.envForm = this.formBuilder.group({
      environnementDeveloppementLibelle: ['', Validators.required],
      environnementDeveloppementDescription: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEnvironnement(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.envForm.valid) {
      const formData = this.envForm.value;

      this.envDevService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Environnement mis à jour avec succès:', response);
            this.router.navigate(['/envDev']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du lenvironnement:', error);
          }
        );
    }
  }

  loadEnvironnement(id: number): void {
    this.envDevService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.envForm.patchValue({
          environnementDeveloppementLibelle: data.environnementDeveloppementLibelle,
          environnementDeveloppementDescription: data.environnementDeveloppementDescription
        });
      },
      error => {
        console.log('Erreur lors du chargement du lieu:', error);
      }
    );
  }
}
