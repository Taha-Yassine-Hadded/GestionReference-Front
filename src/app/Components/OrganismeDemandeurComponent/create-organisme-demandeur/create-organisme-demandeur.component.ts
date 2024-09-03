import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeDemandeurService } from 'src/app/Services/OrganismeDemandeur/organisme-demandeur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-organisme-demandeur',
  templateUrl: './create-organisme-demandeur.component.html',
  styleUrls: ['./create-organisme-demandeur.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateOrganismeDemandeurComponent {
  newOrganisme: any = {}; // Déclaration de la propriété newOrganisme
  formSubmitted: boolean = false; 

  constructor(private organismeDemandeurService: OrganismeDemandeurService, private route: ActivatedRoute, private router: Router) { }
  
  createOrganisme(): void {
    this.formSubmitted = true;
    this.organismeDemandeurService.createOrganismeDemandeur(this.newOrganisme).subscribe(() => {
      this.newOrganisme = {};
      this.router.navigate(['/getOrganisme']);  // Réinitialisation de la propriété newOrganisme après la création
    },
    error => {
      if (error.status === 409) {
        Swal.fire({
          title: "Ce organisme demandeur existe déjà.",
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



