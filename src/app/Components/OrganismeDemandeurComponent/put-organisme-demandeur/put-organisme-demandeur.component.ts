import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganismeDemandeurService } from 'src/app/Services/OrganismeDemandeur/organisme-demandeur.service';

@Component({
  selector: 'app-put-organisme-demandeur',
  templateUrl: './put-organisme-demandeur.component.html',
  styleUrls: ['./put-organisme-demandeur.component.css',
  '../../../../assets/css/bootstrap.min.css'
 ]
})
export class PutOrganismeDemandeurComponent {

  editOrganisme: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute, private router: Router, private organismeDemandeurService: OrganismeDemandeurService
,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadOrganisme(this.id);
    });
  }

  loadOrganisme(id: number): void {
    this.organismeDemandeurService.getOrganismeDemandeur(id).subscribe(
      (data: any) => {
        this.editOrganisme = data;
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération :', error);
      }
    );
  }

  updateOrganisme(id: number): void {
    this.organismeDemandeurService.updateOrganismeDemandeur(id, this.editOrganisme).subscribe(() => {
      console.log(' mis à jour avec succès.');
      // Réinitialiser la propriété editLivraison après la mise à jour, si nécessaire
      this.editOrganisme = {};
      // Rediriger après la mise à jour, si nécessaire
     this.router.navigate(['/getOrganisme']);
    });
  }
}

