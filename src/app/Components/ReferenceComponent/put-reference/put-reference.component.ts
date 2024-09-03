import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl, ValidationErrors  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/Categorie/categorie.service';
import { ClientService } from 'src/app/Services/Client/client.service';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import { ReferenceService } from 'src/app/Services/Reference/reference.service';
import { DevisesService } from 'src/app/Services/Devises/devises.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import { TechnologieService } from 'src/app/Services/Technologie/technologie.service'; // Import TechnologieService
import { MethodologieService } from 'src/app/Services/Methodologie/methodologie.service'; // Import MethodologieService
import { RoleService } from 'src/app/Services/Role/role.service'; // Import RoleService


import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  EnvironnementDeveloppementService
} from "../../../Services/EnvironnementDeveloppement/environnement-developpement.service";
import {BailleurFondService} from "../../../Services/BailleurFond/bailleur-fond.service";
import {FilterService} from "../../../Services/Filter/filter.service";

@Component({
  selector: 'app-put-reference',
  templateUrl: './put-reference.component.html',
  styleUrls: ['./put-reference.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class PutReferenceComponent implements OnInit {
  id!: number;
  referenceForm: FormGroup;
  submitButtonClicked: boolean = false;
  lieux: any[] = [];
  clients: any[] = [];
  categories: any[] = [];
  devises: any[] = [];
  pays: any[] = [];
  technologies: any[] = [];
  environnements: any[] = [];
  methodologies: any[] = [];
  roles: any[] = [];
  bailleurFonds: any[] = [];

  selectedMethodologies: any[] = [];
  selectedTechnologies: any[] = [];
  selectedRoles: any[] = [];
  selectedEnvironnements: any[] = [];
  selectedBailleurFonds: any[] = [];

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
    language: 'fr'
  };

  constructor(
    private formBuilder: FormBuilder,
    private referenceService: ReferenceService,
    private lieuService: LieuService,
    private clientService: ClientService,
    private categorieService: CategorieService,
    private deviseService: DevisesService,
    private route: ActivatedRoute,
    private router: Router,
    private paysService: PaysService,
    private technologieService: TechnologieService,
    private environnementService: EnvironnementDeveloppementService,
    private methodologieService: MethodologieService,
    private roleService: RoleService,
    private bailleurFondService: BailleurFondService,
    private filterService: FilterService
  ) {
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
      methodologieIds: [this.selectedMethodologies.map(item => item.methodologieId),],
      technologieIds: [this.selectedTechnologies.map(item => item.technologieId), ],
      roleIds: [[], Validators.required ],
      environnementIds: [this.selectedEnvironnements.map(item => item.environnementId),],
      bailleurFondIds: [[]]
    });
  }

  onPickListChange(targetArrayName: string, formControlName: string): void {
    const targetArray = this[targetArrayName as keyof this] as any[];
    this.referenceForm.get(formControlName)?.setValue(targetArray.map(item => item.id));
  }

  atLeastOneValidator(control: AbstractControl): ValidationErrors | null {
    if (Array.isArray(control.value) && control.value.length > 0) {
      return null;
    }
    return { atLeastOne: true };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadReference(this.id);
    });
    this.loadPays();
    this.loadClients();
    this.loadCategories();
    this.loadDevises();
    this.loadBailleurFonds();
    this.loadEnvironnements();
    this.loadMethodologies();
    this.loadTechnologies();
    this.loadRoles();
    this.referenceForm.get('paysId')?.valueChanges.subscribe((paysId: number) => {
      if (paysId) {
        this.loadLieuxByPays(paysId);
      }
    });

  }

  loadReference(id: number): void {
    this.referenceService.getOneReferenceById(id).subscribe(
      (data: any) => {
        this.referenceForm.patchValue(data);
        this.selectedBailleurFonds = data.bailleursFonds.map((bf: { bailleurFondId: number }) => bf.bailleurFondId);
        this.selectedRoles = data.roles.map((r: { roleId: number }) => r.roleId);

        this.selectedMethodologies = data.methodologies.map((m: { methodologieId: number }) => m.methodologieId);
        this.methodologieService.getAll().subscribe(
          (allMethodologies: any[]) => {
            this.methodologies = allMethodologies;
            this.selectedMethodologies = this.methodologies.filter(m => this.selectedMethodologies.includes(m.methodologieId));
            this.methodologies = this.methodologies.filter(m => {
              const isSelected = data.methodologies.map((m: { methodologieId: number }) => m.methodologieId).includes(m.methodologieId); return !isSelected;
            });
          },
          error => {
            console.error('Erreur lors du chargement des methodologies:', error);
          }
        );

        this.selectedTechnologies = data.technologies.map((t: { technologieId: number }) => t.technologieId);
        this.technologieService.getAll().subscribe(
          (allTechnologies: any[]) => {
            this.technologies = allTechnologies;
            // Set selected technologies
            this.selectedTechnologies = this.technologies.filter(m => this.selectedTechnologies.includes(m.technologieId));
            // Filter available technologies
            this.technologies = this.technologies.filter(t => !data.technologies.map((t: { technologieId: number }) => t.technologieId).includes(t.technologieId));

          },
          error => {
            console.error('Error loading technologies:', error);
          }
        );

        this.selectedEnvironnements = data.environnements.map((e: { environnementDeveloppementId: number }) => e.environnementDeveloppementId);
        this.environnementService.getAll().subscribe(
          (allEnvironnements: any[]) => {
            this.environnements = allEnvironnements;
            // Set selected environments
            this.selectedEnvironnements = this.environnements.filter(m => this.selectedEnvironnements.includes(m.environnementDeveloppementId));
            // Filter available environments
            this.environnements = this.environnements.filter(e => !data.environnements.map((e: { environnementDeveloppementId: number }) => e.environnementDeveloppementId).includes(e.environnementDeveloppementId));
          },
          error => {
            console.error('Error loading environments:', error);
          }
        );

      },
      error => {
        console.log('Erreur lors du chargement :', error);
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

  loadLieux(): void {
    this.lieuService.getAllLieux().subscribe(
      (data: any[]) => {
        this.lieux = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des lieux :', error);
      }
    );
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe(
      (data: any[]) => {
        this.clients = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des clients :', error);
      }
    );
  }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }

  loadDevises(): void {
    this.deviseService.getAll().subscribe(
      (data: any[]) => {
        this.devises = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des devises :', error);
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

  onSubmit(): void {
    this.submitButtonClicked = true;
    if (this.referenceForm.valid) {
      const formData = this.referenceForm.value;
      formData.methodologieIds = this.selectedMethodologies.map(item => item.methodologieId);
      formData.technologieIds = this.selectedTechnologies.map(item => item.technologieId);
      formData.environnementIds = this.selectedEnvironnements.map(item => item.environnementDeveloppementId);
      this.referenceService.updateReference(this.id, formData)
        .subscribe(
          response => {
            console.log('Référence mise à jour avec succès:', response);
            this.router.navigate(['/getReference']);
            console.log(this.filterService.getCategory())
          },
          error => {
            console.error('Erreur lors de la mise à jour de la référence:', error);
          }
        );
    }
  }


}
