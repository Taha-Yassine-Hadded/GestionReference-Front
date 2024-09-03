import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/Categorie/categorie.service';
import {SecteurActiviteService} from "../../../Services/SecteurActivite/secteur-activite.service";

@Component({
  selector: 'app-put-categorie',
  templateUrl: './put-categorie.component.html',
  styleUrls: ['./put-categorie.component.css',
  '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutCategorieComponent implements OnInit {
  id!: number;
  formSubmitted: boolean = false;
  categorieForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private categorieService : CategorieService,
    private router: Router
  ) {
    this.categorieForm = this.formBuilder.group({
      categorieLibelle: ['', Validators.required],
      categorieShort: ['', Validators.required],
      categorieCodeRef: ['', Validators.required],
      categorieCodeCouleur: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadCategorie(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.categorieForm.valid) {
      const formData = this.categorieForm.value;

      this.categorieService.updateCategorie(this.id, formData)
        .subscribe(
          response => {
            console.log('Categorie mis à jour avec succès:', response);
            this.router.navigate(['/getCategorie']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du categorie: ', error);
          }
        );
    }
  }

  loadCategorie(id: number): void {
    this.categorieService.getCategorie(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.categorieForm.patchValue({
          categorieLibelle: data.categorieLibelle,
          categorieShort: data.categorieShort,
          categorieCodeRef: data.categorieCodeRef,
          categorieCodeCouleur: data.categorieCodeCouleur
        });
      },
      error => {
        console.log('Erreur lors du chargement du categorie:', error);
      }
    );
  }
}
