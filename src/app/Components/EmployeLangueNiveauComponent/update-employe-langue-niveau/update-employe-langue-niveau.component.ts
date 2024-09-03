import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CvLangueNiveauService} from "../../../Services/CvLangueNiveau/cv-langue-niveau.service";
import {EmployeLangueNiveauService} from "../../../Services/EmployeLangueNiveau/employe-langue-niveau.service";

@Component({
  selector: 'app-update-employe-langue-niveau',
  templateUrl: './update-employe-langue-niveau.component.html',
  styleUrls: ['./update-employe-langue-niveau.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class UpdateEmployeLangueNiveauComponent {
  id!: number;
  formSubmitted: boolean = false;
  niveauForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeLangueNiveauService : EmployeLangueNiveauService,
    private router: Router
  ) {
    this.niveauForm = this.formBuilder.group({
      employeLangueNiveauLibelle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadNiveau(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.niveauForm.valid) {
      const formData = this.niveauForm.value;

      this.employeLangueNiveauService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Langue niveau mis à jour avec succès:', response);
            this.router.navigate(['/employeLangueNiveau']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du langue niveau:', error);
          }
        );
    }
  }

  loadNiveau(id: number): void {
    this.employeLangueNiveauService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.niveauForm.patchValue({
          employeLangueNiveauLibelle: data.employeLangueNiveauLibelle,
        });
      },
      error => {
        console.log('Erreur lors du chargement du langue niveau:', error);
      }
    );
  }
}
