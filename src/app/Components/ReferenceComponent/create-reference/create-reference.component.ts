import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ReferenceService } from 'src/app/Services/Reference/reference.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/Categorie/categorie.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { DevisesService } from 'src/app/Services/Devises/devises.service';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import { MethodologieService } from 'src/app/Services/Methodologie/methodologie.service';
import { TechnologieService } from 'src/app/Services/Technologie/technologie.service';
import { RoleService } from 'src/app/Services/Role/role.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  EnvironnementDeveloppementService
} from "../../../Services/EnvironnementDeveloppement/environnement-developpement.service";
import {BailleurFondService} from "../../../Services/BailleurFond/bailleur-fond.service";

@Component({
  selector: 'app-create-reference',
  templateUrl: './create-reference.component.html',
  styleUrls: ['./create-reference.component.css']
})
export class CreateReferenceComponent implements OnInit {
  selectedMethodologies: any[] = [];
  selectedTechnologies: any[] = [];
  selectedRoles: any[] = [];
  selectedEnvironnements: any[] = [];
  selectedBailleurFonds: any[] = [];

  referenceForm: FormGroup = this.formBuilder.group({
    clientId: ['', Validators.required],
    devisesId: ['', Validators.required],
    lieuId: ['', Validators.required],
    categorieId: ['', Validators.required],
    referenceRef: ['', Validators.required],
    referenceTitre: ['', Validators.required],
    referenceLibelle: ['', Validators.required],
    referenceUrlFonctionnel: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)]],
    referenceDuree: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    referenceDateDemarrage: ['', Validators.required],
    referenceDateAchevement: ['', Validators.required],
    referenceDateReceptionProvisoire: ['', Validators.required],
    referenceDateReceptionDefinitive: ['', ],
    referenceCaracteristiques: ['', Validators.required],
    referenceDescription: ['', Validators.required],
    referenceDescriptionServiceEffectivemenetRendus: ['', Validators.required],
    referenceDureeGarantie: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    referenceBudget: ['', Validators.pattern(/^\d+(\.\d+)?$/)],
    referencePartBudgetGroupement: ['', Validators.required],
    referenceRemarque: ['',],
    paysId: ['', Validators.required],
    methodologieIds: [this.selectedMethodologies.map(item => item.methodologieId),Validators.required],
    technologieIds: [this.selectedTechnologies.map(item => item.technologieId), Validators.required],
    roleIds: [[], Validators.required ],
    environnementIds: [this.selectedEnvironnements.map(item => item.environnementId),Validators.required],
    bailleurFondIds: [[]]
  });

  atLeastOneValidator(control: AbstractControl): ValidationErrors | null {
    if (Array.isArray(control.value) && control.value.length > 0) {
      return null;
    }
    return { atLeastOne: true };
  }
  clients: any[] = [];
  devises: any[] = [];
  lieux: any[] = [];
  categories: any[] = [];
  pays: any[] = [];
  submitButtonClicked: boolean = false;
  methodologies: any[] = [];
  technologies: any[] = [];
  roles: any[] = [];
  environnements: any[] = [];
  bailleurFonds: any[] = [];


  public Editor = ClassicEditor;
  public config = {
    // CKEditor configuration
    toolbar: [
      'bold', 'italic', '|',
      'undo', 'redo', '|',
      'indent', 'outdent', '|',
      'bulletedList', 'numberedList', '|',
      'link', 'blockQuote', '|',
    ],
    language: 'fr' ,
  };

  constructor(
    private formBuilder: FormBuilder,
    private referenceService: ReferenceService,
    private categorieService: CategorieService,
    private clientService: ClientService,
    private devisesService: DevisesService,
    private lieuService: LieuService,
    private route: ActivatedRoute,
    private router: Router,
    private paysService: PaysService,
    private methodologieService: MethodologieService,
    private technologieService: TechnologieService,
    private roleService: RoleService,
    private environnementService: EnvironnementDeveloppementService,
    private bailleurFondService: BailleurFondService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
    this.loadDevises();
    this.loadCategories();
    this.loadMethodologies();
    this.loadTechnologies();
    this.loadRoles();
    this.loadEnvironnements();
    this.loadBailleurFonds();
    this.loadPays();
    this.referenceForm.get('paysId')?.valueChanges.subscribe((paysId: number) => {
      if (paysId) {
        this.loadLieuxByPays(paysId);
      }
    });
  }

  initForm(): void {
    this.referenceForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      devisesId: ['', Validators.required],
      lieuId: ['', Validators.required],
      categorieId: ['', Validators.required],
      referenceRef: ['', Validators.required],
      referenceTitre: ['', Validators.required],
      referenceLibelle: ['', Validators.required],
      referenceUrlFonctionnel: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/)]],
      referenceDuree: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      referenceDateDemarrage: ['', Validators.required],
      referenceDateAchevement: ['', Validators.required],
      referenceDateReceptionProvisoire: ['', Validators.required],
      referenceDateReceptionDefinitive: ['', ],
      referenceCaracteristiques: ['', Validators.required],
      referenceDescription: ['', Validators.required],
      referenceDescriptionServiceEffectivemenetRendus: ['', Validators.required],
      referenceDureeGarantie: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      referenceBudget: ['', Validators.pattern(/^\d+(\.\d+)?$/)],
      referencePartBudgetGroupement: ['', Validators.required],
      referenceRemarque: ['',],
      paysId: ['', Validators.required],
      methodologieIds: [this.selectedMethodologies.map(item => item.methodologieId),Validators.required],
      technologieIds: [this.selectedTechnologies.map(item => item.technologieId),Validators.required ],
      roleIds: [[], Validators.required ],
      environnementIds: [this.selectedEnvironnements.map(item => item.environnementId),Validators.required],
      bailleurFondIds: [[]]
    });
  }

  onPickListChange(targetArrayName: string, formControlName: string): void {
    const targetArray = this[targetArrayName as keyof this] as any[];
    this.referenceForm.get(formControlName)?.setValue(targetArray.map(item => item.id));
  }



  loadPays(): void {
    this.paysService.getAllPays().subscribe(
      (data: any[]) => {
        this.pays = data;
      },
      error => {
        console.error('Error loading pays:', error);
      }
    );
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data: any[]) => {
        this.clients = data;
      },
      error => {
        console.error('Error loading clients:', error);
      }
    );
  }

  loadDevises(): void {
    this.devisesService.getAll().subscribe(
      (data: any[]) => {
        this.devises = data;
      },
      error => {
        console.error('Error loading devises:', error);
      }
    );
  }

  loadLieuxByPays(paysId: number): void {
    this.lieuService.getLieuxByPays(paysId).subscribe(
      (data: any[]) => {
        this.lieux = data;
      },
      error => {
        console.error('Error loading lieux:', error);
      }
    );
  }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  loadMethodologies(): void {
    this.methodologieService.getAll().subscribe(
      (data: any[]) => {
        this.methodologies = data;
      },
      error => {
        console.error('Error loading methodologies:', error);
      }
    );
  }

  loadTechnologies(): void {
    this.technologieService.getAll().subscribe(
      (data: any[]) => {
        this.technologies = data;
      },
      error => {
        console.error('Error loading technologies:', error);
      }
    );
  }

  loadRoles(): void {
    this.roleService.getAll().subscribe(
      (data: any[]) => {
        this.roles = data;
      },
      error => {
        console.error('Error loading roles:', error);
      }
    );
  }

  loadEnvironnements(): void {
    this.environnementService.getAll().subscribe(
      (data: any[]) => {
        this.environnements = data;
      },
      error => {
        console.error('Error loading environnements:', error);
      }
    );
  }

  loadBailleurFonds(): void {
    this.bailleurFondService.getAll().subscribe(
      (data: any[]) => {
        this.bailleurFonds = data;
      },
      error => {
        console.error('Error loading bailleurFonds:', error);
      }
    );
  }

  createReference(): void {
    this.submitButtonClicked = true;
    if (this.referenceForm.valid) {

      const formData = this.referenceForm.value;
      formData.methodologieIds=this.selectedMethodologies.map(item => item.methodologieId);
      formData.technologieIds=this.selectedTechnologies.map(item => item.technologieId);
      formData.environnementIds=this.selectedEnvironnements.map(item => item.environnementDeveloppementId);
      this.referenceService.createReference(formData).subscribe(
        (response) => {
          this.referenceForm.reset();
          this.router.navigate(['/getReference']);
        },
        (error) => {
          console.error('Error creating reference:', error);
        }
      );
    }
  }
}
