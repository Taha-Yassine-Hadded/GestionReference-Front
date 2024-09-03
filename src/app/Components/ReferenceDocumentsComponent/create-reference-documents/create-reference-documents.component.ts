import { Component } from '@angular/core';
import {PaysService} from "../../../Services/Pays/pays.service";
import {ContinentService} from "../../../Services/Continent/continent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import Swal from "sweetalert2";
import {ReferenceDocumentsService} from "../../../Services/ReferenceDocuments/reference-documents.service";
import {ReferenceService} from "../../../Services/Reference/reference.service";
import {TypeDocumentService} from "../../../Services/TypeDocument/type-document.service";

@Component({
  selector: 'app-create-reference-documents',
  templateUrl: './create-reference-documents.component.html',
  styleUrls: ['./create-reference-documents.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateReferenceDocumentsComponent {
  newRef: any = {};
  references: any[] = [];
  types: any[] = [];
  formSubmitted: boolean = false;
  constructor(private refDocService: ReferenceDocumentsService,private referenceService: ReferenceService, private typeDocService: TypeDocumentService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newRef = {
      referenceID: '',
      typeDocumentId: ''
    };
    this.loadReferences();
    this.loadTypes();
  }

  loadReferences(): void {
    this.referenceService.getAllReferences()
      .subscribe(
        refs => {
          console.log('References loaded:', refs);
          this.references = refs;
        },
        error => {
          console.error('Une erreur est survenue lors du chargement des references :', error);
        }
      );
  }

  loadTypes(): void {
    this.typeDocService.getAll()
      .subscribe(
        types => {
          console.log('Types loaded:', types);
          this.types = types;
        },
        error => {
          console.error('Une erreur est survenue lors du chargement des types documents :', error);
        }
      );
  }
  onSubmit(): void {
    this.formSubmitted = true;
    console.log(this.newRef);
    this.refDocService.createRefDocument(this.newRef).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.newRef = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/referenceDocuments']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Reference document déjà existant",
            text: "Ce lieu existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du reference :', error);
        }
      }
    );
  }
}
