import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppelOffreService } from 'src/app/Services/AppelOffre/appel-offre.service';
import { AppelOffreTypeService } from 'src/app/Services/AppelOffreType/appel-offre-type.service';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import { MoyenLivraisonService } from 'src/app/Services/MoyenLivraison/moyen-livraison.service';
import { OrganismeDemandeurService } from 'src/app/Services/OrganismeDemandeur/organisme-demandeur.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';

@Component({
  selector: 'app-put-appel-offre',
  templateUrl: './put-appel-offre.component.html',
  styleUrls: ['./put-appel-offre.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class PutAppelOffreComponent implements OnInit {

  id!: number;
  appelOffreForm: FormGroup = this.formBuilder.group({
    appelOffreDevis: ['', Validators.required],
    appelOffreObjet: ['', Validators.required],
    appelOffreDateRemise: ['', Validators.required],
    appelOffreRetire: [false, Validators.required],
    appelOffreParticipation: [false, Validators.required],
    appelOffreEtat: ['', Validators.required],
    appelOffreTypeId: ['', Validators.required],
    moyenLivraisonId: ['', Validators.required],
    organismeDemandeurId: ['', Validators.required],
    paysId: ['', Validators.required],
  });
  appelOffreTypes: any[] = [];
  moyensLivraison: any[] = [];
  organismesDemandeur: any[] = [];
  pays: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private appelOffreService: AppelOffreService,
    private appelOffreTypeService: AppelOffreTypeService,
    private organismeDemandeurService: OrganismeDemandeurService,
    private moyenLivraisonService: MoyenLivraisonService,
    private paysService: PaysService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadAppelOffre(this.id);
    });
    
    this.initForm();
    this.loadAppelOffreTypes();
    this.loadMoyensLivraison();
    this.loadOrganismesDemandeur();
    this.loadPays();
  }

  initForm(): void {
    this.appelOffreForm = this.formBuilder.group({
      appelOffreDevis: ['', Validators.required],
      appelOffreObjet: ['', Validators.required],
      appelOffreDateRemise: ['', Validators.required],
      appelOffreRetire: ['', Validators.required],
      appelOffreParticipation: ['', Validators.required],
      appelOffreEtat: ['', Validators.required],
      appelOffreTypeId: ['', Validators.required],
      moyenLivraisonId: ['', Validators.required],
      organismeDemandeurId: ['', Validators.required],
      paysId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.appelOffreForm.valid) {
      const formData = this.appelOffreForm.value;

      this.appelOffreService.updateAppelOffre(this.id, formData)
        .subscribe(
          response => {
            console.log('Appel d\'offre mis à jour avec succès:', response);
            this.appelOffreForm.reset();
            this.router.navigate(['/getAppelOffre']);
          },
          error => {
            console.log('Erreur lors de la mise à jour de l\'appel d\'offre:', error);
          }
        );
    }
  }
  loadPays(): void {
    this.paysService.getAllPays().subscribe(
      (data: any[]) => {
        this.pays= data;
      },
      error => {
        console.error('Error loading lieux:', error);
      }
    );
  }
  loadAppelOffre(id: number): void {
    this.appelOffreService.getAppelOffreById(id).subscribe(
      (data: any) => {
        this.appelOffreForm.patchValue(data); // Assign the fetched data to the form
      },
      error => {
        console.log('Erreur lors du chargement de l\'appel d\'offre:', error);
      }
    );
  }

  loadAppelOffreTypes(): void {
    this.appelOffreTypeService.getAppelOffreTypes().subscribe(
      (data: any[]) => {
        this.appelOffreTypes = data;
      },
      error => {
        console.log('Erreur lors du chargement des types d\'appel d\'offres:', error);
      }
    );
  }

  loadMoyensLivraison(): void {
    this.moyenLivraisonService.getAllMoyensLivraison().subscribe(
      (data: any[]) => {
        this.moyensLivraison = data;
      },
      error => {
        console.log('Erreur lors du chargement des moyens de livraison:', error);
      }
    );
  }

  loadOrganismesDemandeur(): void {
    this.organismeDemandeurService.getAllOrganismesDemandeurs().subscribe(
      (data: any[]) => {
        this.organismesDemandeur = data;
      },
      error => {
        console.log('Erreur lors du chargement des organismes demandeurs:', error);
      }
    );
  }
}
