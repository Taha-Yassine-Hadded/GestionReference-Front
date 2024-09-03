import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoyenLivraisonService } from 'src/app/Services/MoyenLivraison/moyen-livraison.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-moyen-livraison',
  templateUrl: './create-moyen-livraison.component.html',
  styleUrls: ['./create-moyen-livraison.component.css',
  '../../../../assets/css/bootstrap.min.css'
  
]
})
export class CreateMoyenLivraisonComponent {

  newLivraison: any = {};
  formSubmitted: boolean = false; 

  constructor(private moyenLivraisonService: MoyenLivraisonService, private route: ActivatedRoute, private router: Router) { }
  
  createMoyenLivraison(): void {
    this.formSubmitted = true;
    this.moyenLivraisonService.createMoyenLivraison(this.newLivraison).subscribe(
      () => {
        // Reset the form after successful creation
        this.newLivraison = {};
        // Navigate to the appropriate route
        this.router.navigate(['/moyenLivraison']);
       },
        error => {
          if (error.status === 409) {
            Swal.fire({
              title: "Ce moyen de livraison existe déjà.",
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