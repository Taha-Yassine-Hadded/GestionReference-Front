import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SituationFamilialeService } from 'src/app/Services/SituationFamiliale/situation-familiale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-situation-familiale',
  templateUrl: './create-situation-familiale.component.html',
  styleUrls: ['./create-situation-familiale.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateSituationFamilialeComponent {
  newSituation: any = {};
  formSubmitted: boolean = false;
  constructor(private  situationFamilialeService: SituationFamilialeService , private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }
  
  createSituation(): void {
    this.formSubmitted = true;
    this.situationFamilialeService.createSituationFamiliale(this.newSituation).subscribe(() => {
      this.newSituation = {};
      this.router.navigate(['/getSituation']);
    },
    error => {
      if (error.status === 409) {
        Swal.fire({
          title: "Cette situation familiale existe déjà.",
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






