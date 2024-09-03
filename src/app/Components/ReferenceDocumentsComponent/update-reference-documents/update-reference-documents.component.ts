import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PaysService} from "../../../Services/Pays/pays.service";
import {LieuService} from "../../../Services/Lieu/lieu.service";
import {ReferenceService} from "../../../Services/Reference/reference.service";
import {ReferenceDocumentsComponent} from "../reference-documents/reference-documents.component";
import {ReferenceDocumentsService} from "../../../Services/ReferenceDocuments/reference-documents.service";
import {TypeDocumentService} from "../../../Services/TypeDocument/type-document.service";

@Component({
  selector: 'app-update-reference-documents',
  templateUrl: './update-reference-documents.component.html',
  styleUrls: ['./update-reference-documents.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateReferenceDocumentsComponent {
  id!: number;
  refDocForm: FormGroup;
  types: any[] = [];
  references: any[] = [];
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private referenceService: ReferenceService,
    private typeService: TypeDocumentService,
    private refDocService: ReferenceDocumentsService,
    private router: Router
  ) {
    this.refDocForm = this.formBuilder.group({
      referenceDocumentsLibelle: ['', Validators.required],
      referenceID: ['', Validators.required],
      typeDocumentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadRefDocument(this.id);
    });

    this.loadReferences();
    this.loadTypeDocuments();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.refDocForm.valid) {
      const formData = this.refDocForm.value;
      console.log(formData)
      this.refDocService.updateRefDocument(this.id, formData)
        .subscribe(
          response => {
            console.log('Reference document mis à jour avec succès:', response);
            this.router.navigate(['/referenceDocuments']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du reference document:', error);
          }
        );
    }
  }

  loadRefDocument(id: number): void {
    this.refDocService.getRefDocumentById(id).subscribe(
      (data: any) => {
        console.log(data);
        // Patch des valeurs individuelles dans le formulaire
        this.refDocForm.patchValue({
          referenceDocumentsLibelle: data.referenceDocumentsLibelle,
          referenceID: data.referenceId,
          typeDocumentId: data.typeDocumentId,
        });
      },
      error => {
        console.log('Erreur lors du chargement du lieu:', error);
      }
    );
  }

  loadReferences(): void {
    this.referenceService.getAllReferences().subscribe(
      (data: any[]) => {
        this.references = data;
      },
      error => {
        console.log('Erreur lors du chargement des references:', error);
      }
    );
  }

  loadTypeDocuments(): void {
    this.typeService.getAll().subscribe(
      (data: any[]) => {
        this.types = data;
      },
      error => {
        console.log('Erreur lors du chargement des types de document:', error);
      }
    );
  }
}
