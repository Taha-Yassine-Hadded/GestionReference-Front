import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from 'src/app/Services/Categorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css',
    '../../../../assets/css/bootstrap.min.css'
  ]
})
export class CreateCategorieComponent {

  newCategorie: any = {};
  formSubmitted: boolean = false;
  alerts: { type: string, message: string }[] = [];

  constructor(private categorieService: CategorieService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  createCategorie(): void {
    this.formSubmitted = true;
    console.log(this.newCategorie);
    this.categorieService.createCategorie(this.newCategorie).subscribe(() => {
      this.newCategorie = {};
      this.router.navigate(['/getCategorie']);
    },
    error => {
      if (error.status === 409) {
        Swal.fire({
          title: "Cette catégorie d'offre existe déjà.",
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
        console.error('Erreur lors de la création du category :', error);
        // Ajoutez ici la logique pour gérer les erreurs autres que le conflit de duplication
      }
    }
  );
}
}
