import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DevisesService} from "../../../Services/Devises/devises.service";
import {TypeDocumentService} from "../../../Services/TypeDocument/type-document.service";

@Component({
  selector: 'app-update-type-document',
  templateUrl: './update-type-document.component.html',
  styleUrls: ['./update-type-document.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateTypeDocumentComponent {
  id!: number;
  formSubmitted: boolean = false;
  typeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private typeDocumentService : TypeDocumentService,
    private router: Router
  ) {
    this.typeForm = this.formBuilder.group({
      typeDocumentLibelle: ['', Validators.required],
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

      this.typeDocumentService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Type document mis à jour avec succès:', response);
            this.router.navigate(['/typeDocument']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du type de document:', error);
          }
        );
    }
  }

  loadType(id: number): void {
    this.typeDocumentService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.typeForm.patchValue({
          typeDocumentLibelle: data.typeDocumentLibelle,
        });
      },
      error => {
        console.log('Erreur lors du chargement du type document:', error);
      }
    );
  }
}
