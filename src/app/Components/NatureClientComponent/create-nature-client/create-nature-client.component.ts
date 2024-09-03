import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NatureClientService } from 'src/app/Services/NatureClient/nature-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-nature-client',
  templateUrl: './create-nature-client.component.html',
  styleUrls: ['./create-nature-client.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateNatureClientComponent {
  newNature: any = {};
  formSubmitted: boolean = false;

  constructor(private natureClientService: NatureClientService , private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  createNature(): void {
    this.formSubmitted = true;
    console.log(this.newNature);
    this.natureClientService.createNatureClient(this.newNature).subscribe(() => {
      this.newNature = {};
      this.router.navigate(['/getNature']);
    },
    error => {
      if (error.status === 409) {
        Swal.fire({
          title: "Cette nature de client existe déjà.",
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



