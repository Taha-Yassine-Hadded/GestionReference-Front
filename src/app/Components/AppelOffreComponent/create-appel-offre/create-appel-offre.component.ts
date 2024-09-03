import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppelOffreService } from 'src/app/Services/AppelOffre/appel-offre.service';
import { AppelOffreTypeService } from 'src/app/Services/AppelOffreType/appel-offre-type.service';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import { MoyenLivraisonService } from 'src/app/Services/MoyenLivraison/moyen-livraison.service';
import { OrganismeDemandeurService } from 'src/app/Services/OrganismeDemandeur/organisme-demandeur.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-appel-offre',
  templateUrl: './create-appel-offre.component.html',
  styleUrls: ['./create-appel-offre.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CreateAppelOffreComponent implements OnInit {
  appelOffreForm: FormGroup = this.formBuilder.group({
    appelOffreDevis: ['', Validators.required],
    appelOffreObjet: ['', Validators.required],
    appelOffreDateRemise: ['', Validators.required],
    appelOffreRetire: [false, Validators.required],
    appelOffreParticipation: [false, Validators.required],
    appelOffreEtat: ['', Validators.required],
    appelOffreTypeId: ['', Validators.required],
    moyenLivraisonId: ['', Validators.required],
    lieuId: ['', Validators.required],
    organismeDemandeurId: ['', Validators.required]
  });
  appelOffreTypes: any[] = [];
  moyensLivraison: any[] = [];
  organismesDemandeur: any[] = [];
  pays: any[] = [];
  submitButtonClicked: boolean = false;

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
      paysId: ['', Validators.required],
      organismeDemandeurId: ['', Validators.required]
    });
  }
  isNumber(): boolean {
    const control = this.appelOffreForm.get('appelOffreDevis');
    if (control !== null) {
      const value = control.value;
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
    return false;
  }
  onSubmit(): void {
    this.submitButtonClicked = true;
  
    const formData = this.appelOffreForm.value;

    // Check if selected fields contain objects with 'id' property
    if (formData.appelOffreTypeId && formData.moyenLivraisonId && formData.organismeDemandeurId && formData.paysId) {
      this.appelOffreService.createAppelOffre(formData)
        .subscribe(
          response => {
            console.log('Appel d\'offre créé avec succès:', response);
            this.router.navigate(['/getAppelOffre']);
          },
          error => {
            if (error.status === 409) {
              Swal.fire({
                title: "Ce devis déjà.",
                icon: "warning",
              
                confirmButtonColor: "#3085d6",
                
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  // Si l'utilisateur confirme, vous pouvez ajouter une logique supplémentaire ici
                  console.log('L\'utilisateur a confirmé');
                }
              });
            } else {
              console.error('Erreur lors de la création du type d\'appel d\'offre :', error);
              // Ajoutez ici la logique pour gérer les erreurs autres que le conflit de duplication
            }
          }
        );
    }
  }  

  loadPays(): void {
    this.paysService.getAllPays().subscribe(
      (data: any[]) => {
        this.pays = data;
      },
      error => {
        console.error('Error loading lieux:', error);
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
