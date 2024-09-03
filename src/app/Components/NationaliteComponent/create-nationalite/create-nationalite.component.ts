import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NationaliteService } from 'src/app/Services/Nationalite/nationalite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-nationalite',
  templateUrl: './create-nationalite.component.html',
  styleUrls: ['./create-nationalite.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateNationaliteComponent {
  newNationalite: any = {};
  formSubmitted: boolean = false; 
  constructor(private NationaliteService: NationaliteService , private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }
  
  createNationalite(): void {
    this.formSubmitted = true;
    this.NationaliteService.createNationalite(this. newNationalite).subscribe(() => {
      this.newNationalite = {};
      this.router.navigate(['/getNationalite']);
    },
    error => {
      if (error.status === 409) {
        Swal.fire({
          title: "Cette nationalité existe déjà.",
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