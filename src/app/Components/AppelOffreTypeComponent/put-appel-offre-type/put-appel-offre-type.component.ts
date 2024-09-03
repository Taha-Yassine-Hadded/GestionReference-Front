import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppelOffreTypeService } from 'src/app/Services/AppelOffreType/appel-offre-type.service';

@Component({
  selector: 'app-put-appel-offre-type',
  templateUrl: './put-appel-offre-type.component.html',
  styleUrls: ['./put-appel-offre-type.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class PutAppelOffreTypeComponent implements OnInit {
  editAppelOffreType: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute, private router: Router, private appelOffreTypeService: AppelOffreTypeService
  ,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadAppelOffreType(this.id);
    });
  }

  loadAppelOffreType(id: number): void {
    this.appelOffreTypeService.getAppelOffreType(id).subscribe(
      (data: any) => {
        this.editAppelOffreType = data;
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération de l\'appel d\'offre type:', error);
      }
    );
  }

  updateAppelOffreType(): void {
    this.appelOffreTypeService.updateAppelOffreType(this.id, this.editAppelOffreType).subscribe(() => {
      console.log('Appel d\'offre type mis à jour avec succès.');
      this.router.navigate(['/getAppelOffreType']); // Rediriger après la mise à jour, si nécessaire
    });
  }
}
