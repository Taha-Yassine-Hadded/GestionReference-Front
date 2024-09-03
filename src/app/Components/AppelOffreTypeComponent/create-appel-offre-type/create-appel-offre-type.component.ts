import { Component } from '@angular/core';
import { AppelOffreTypeService } from 'src/app/Services/AppelOffreType/appel-offre-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Importez Location depuis @angular/common
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-appel-offre-type',
  templateUrl: './create-appel-offre-type.component.html',
  styleUrls: ['./create-appel-offre-type.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CreateAppelOffreTypeComponent {

  appelOffreTypeForm: FormGroup;
  formSubmitted: boolean = false; 
  appelOffreType: string = '';
  constructor(
    private appelOffreTypeService: AppelOffreTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.appelOffreTypeForm = this.fb.group({
      appelOffreType: ['', Validators.required]
    });
  }



  createAppelOffreType(appelOffreType: string): void { 
      this.formSubmitted = true;
      if (!appelOffreType) {
        console.error('Le champ Type d\'appel d\'offre est requis.');
        return; // Arrêter l'exécution de la méthode si le champ est vide
      }
      // Implémentation de la méthode createAppelOffreType
      this.appelOffreTypeService.createAppelOffreType(appelOffreType).subscribe(
        response => {
          console.log('Type d\'appel d\'offre créé avec succès !');
          this.router.navigate(['/getAppelOffreType']);
          // Ajoutez ici la logique pour gérer la réponse de l'API
        },
        error => {
          if (error.status === 409) {
            Swal.fire({
              title: "Ce type d'appel d'offre existe déjà.",
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