import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NationaliteService } from 'src/app/Services/Nationalite/nationalite.service';

@Component({
  selector: 'app-put-nationalite',
  templateUrl: './put-nationalite.component.html',
  styleUrls: ['./put-nationalite.component.css',
  '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutNationaliteComponent {
  editNationalite: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute, private router: Router, private nationaliteService: NationaliteService
,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadNationalite(this.id);
    });
  }
  loadNationalite(id: number): void {
    this.nationaliteService.getNationaliteById(id).subscribe(
      (data: any) => {
        this.editNationalite = data;
       
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération de l\'appel d\'offre type:', error);
      }
    );
  }

  updateNationalite(id: number): void {
    this.nationaliteService.updateNationalite(id, this.editNationalite).subscribe(() => {
      this.editNationalite = {}; // Réinitialiser la propriété editCategorie après la mise à jour
      this.router.navigate(['/getNationalite']); 
    });
  }
}

