import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DevisesService} from "../../../Services/Devises/devises.service";

@Component({
  selector: 'app-update-devises',
  templateUrl: './update-devises.component.html',
  styleUrls: ['./update-devises.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateDevisesComponent {
  id!: number;
  formSubmitted: boolean = false;
  deviseForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private devisesService : DevisesService,
    private router: Router
  ) {
    this.deviseForm = this.formBuilder.group({
      devisesLibelle: ['', Validators.required],
      devisesAcronyme: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadDevise(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.deviseForm.valid) {
      const formData = this.deviseForm.value;

      this.devisesService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Devise mis à jour avec succès:', response);
            this.router.navigate(['/devises']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du devise:', error);
          }
        );
    }
  }

  loadDevise(id: number): void {
    this.devisesService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.deviseForm.patchValue({
          devisesLibelle: data.devisesLibelle,
          devisesAcronyme: data.devisesAcronyme
        });
      },
      error => {
        console.log('Erreur lors du chargement du devise:', error);
      }
    );
  }
}
