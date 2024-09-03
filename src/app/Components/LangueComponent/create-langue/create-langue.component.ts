import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangueService } from 'src/app/Services/Langue/langue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-langue',
  templateUrl: './create-langue.component.html',
  styleUrls: ['./create-langue.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateLangueComponent {
  formSubmitted: boolean = false; 
  newLangue: any = {};

  constructor(private langueService:LangueService , private route: ActivatedRoute, private router: Router,private fb: FormBuilder) {}
  
  createLangue(): void {
    this.formSubmitted = true;
    this.langueService.createLangue(this.newLangue).subscribe(
      () => {
        // Succès : Redirection vers la liste des langues après la création
        this.newLangue = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/getLangue']);
      },
      (error) => {
        if (error.status === 409) {
          // Langue déjà existante : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: 'Cette langue existe déjà.',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              // Si l'utilisateur confirme, vous pouvez ajouter une logique supplémentaire ici
              console.log('L\'utilisateur a confirmé');
            }
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création de la langue :', error);
          // Ajoutez ici la logique pour gérer les erreurs autres que le conflit de duplication
        }
      }
    );
  }
}

