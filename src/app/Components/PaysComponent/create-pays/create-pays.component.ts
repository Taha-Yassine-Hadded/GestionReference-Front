import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import Swal from 'sweetalert2';
import {ContinentService} from "../../../Services/Continent/continent.service";

@Component({
  selector: 'app-create-pays',
  templateUrl: './create-pays.component.html',
  styleUrls: ['./create-pays.component.css',
  '../../../../assets/css/bootstrap.min.css'

]
})
export class CreatePaysComponent implements OnInit{
  newPays: any = {};
  continents: any[] = [];
  formSubmitted: boolean = false;
  constructor(private paysService: PaysService,private continentService: ContinentService, private route: ActivatedRoute, private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newPays = {
      continentId: ''
    };
    this.loadContinents();
  }

  loadContinents(): void {
    this.continentService.getAll()
      .subscribe(
        continents => {
          console.log('Continents loaded:', continents);
          this.continents = continents;
        },
        error => {
          console.error('Une erreur est survenue lors du chargement des continents :', error);
        }
      );
  }
  onSubmit(): void {
    this.formSubmitted = true;
    console.log(this.newPays);
    this.paysService.createPays(this.newPays).subscribe(
      () => {
        // Succès : Redirection vers la liste des lieux après la création
        this.newPays = {}; // Réinitialisation des données du formulaire
        this.router.navigate(['/getPays']);
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



