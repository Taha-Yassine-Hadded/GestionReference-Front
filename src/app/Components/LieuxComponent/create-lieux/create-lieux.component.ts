import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-lieux',
  templateUrl: './create-lieux.component.html',
  styleUrls: ['./create-lieux.component.css',
  '../../../../assets/css/bootstrap.min.css'
  
]
})
export class CreateLieuxComponent {
  formData: any = {};
  pays: any[] = [];
  formSubmitted: boolean = false; 
  constructor(private lieuService: LieuService, private paysService: PaysService, private router: Router) { }
  ngOnInit(): void {
    this.formData = {
      paysId: '' // Initialisez-le avec une chaîne vide ou toute autre valeur correspondant à l'option par défaut
  };
    this.loadPays();
  }

  loadPays(): void {
    this.paysService.getAllPays()
      .subscribe(
       pays => {
          this.pays = pays;
        },
        error => {
          console.error('Une erreur est survenue lors du chargement des pays :', error);
          // Traitez l'erreur comme nécessaire
        }
      );
  }


  onSubmit(): void {
    this.formSubmitted = true;
    this.lieuService.createLieu(this.formData).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.formData = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/getLieu']);
      },
      (error) => {
        if (error.status === 409) {
          // Lieu déjà existant : Afficher une alerte avec SweetAlert
          Swal.fire({
            title: "Lieu déjà existant",
            text: "Ce lieu existe déjà.",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          // Autre erreur : Afficher l'erreur dans la console
          console.error('Erreur lors de la création du lieu :', error);
        }
      }
    );
  }
}  