import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {BailleurFondService} from "../../../Services/BailleurFond/bailleur-fond.service";

@Component({
  selector: 'app-update-bailleur-fond',
  templateUrl: './update-bailleur-fond.component.html',
  styleUrls: ['./update-bailleur-fond.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateBailleurFondComponent {
  id!: number;
  formSubmitted: boolean = false;
  bailleurFondForm: FormGroup;
  pays: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bailleurFondService : BailleurFondService,
    private router: Router
  ) {
    this.bailleurFondForm = this.formBuilder.group({
      bailleurFondLibelle: ['', Validators.required],
      bailleurFondAcronyme: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadBailleurFond(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.bailleurFondForm.valid) {
      const formData = this.bailleurFondForm.value;

      this.bailleurFondService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Bailleur fond mis à jour avec succès:', response);
            this.router.navigate(['/bailleurFond']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du bailleur fond:', error);
          }
        );
    }
  }

  loadBailleurFond(id: number): void {
    this.bailleurFondService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.bailleurFondForm.patchValue({
          bailleurFondLibelle: data.bailleurFondLibelle,
          bailleurFondAcronyme: data.bailleurFondAcronyme
        });
      },
      error => {
        console.log('Erreur lors du chargement du lieu:', error);
      }
    );
  }
}
