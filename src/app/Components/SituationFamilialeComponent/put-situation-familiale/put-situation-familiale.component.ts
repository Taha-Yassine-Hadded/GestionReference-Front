import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SituationFamilialeService } from 'src/app/Services/SituationFamiliale/situation-familiale.service';

@Component({
  selector: 'app-put-situation-familiale',
  templateUrl: './put-situation-familiale.component.html',
  styleUrls: ['./put-situation-familiale.component.css',
    '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutSituationFamilialeComponent implements OnInit {

  editSituation: any = {};
  id!: number;

  constructor(private route: ActivatedRoute, private router: Router, private situationFamilialeService: SituationFamilialeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadSituation(this.id);
    });
  }

  loadSituation(id: number): void {
    this.situationFamilialeService.getSituationFamilialeById(id).subscribe(
      (data: any) => {
        this.editSituation = data;
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération de l\'appel d\'offre type:', error);
      }
    );
  }

  updateSituation(id: number): void {
    if (!this.editSituation.situationFamiliale) {
      return; // Stop form submission if the field is empty
    }
    this.situationFamilialeService.updateSituationFamiliale(id, this.editSituation).subscribe(() => {
      this.editSituation = {}; // Réinitialiser la propriété editSituation après la mise à jour
      this.router.navigate(['/getSituation']);
    });
  }
}
