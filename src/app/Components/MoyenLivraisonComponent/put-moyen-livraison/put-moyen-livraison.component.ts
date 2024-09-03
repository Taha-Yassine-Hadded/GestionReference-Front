import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MoyenLivraisonService } from 'src/app/Services/MoyenLivraison/moyen-livraison.service';

@Component({
  selector: 'app-put-moyen-livraison',
  templateUrl: './put-moyen-livraison.component.html',
  styleUrls: ['./put-moyen-livraison.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class PutMoyenLivraisonComponent implements OnInit {
  id!: number;
  livraisonForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private moyenLivraisonService: MoyenLivraisonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.livraisonForm = this.formBuilder.group({
      moyenLivraison: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadLivraison(this.id);
    });
  }

  loadLivraison(id: number): void {
    this.moyenLivraisonService.getMoyenLivraison(id).subscribe(
      (data: any) => {
        this.livraisonForm.patchValue(data);
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération :', error);
      }
    );
  }

  onSubmit(): void {
    console.log('onSubmit called'); // Add this line to debug
    if (this.livraisonForm.valid) {
      const moyenLivraison = this.livraisonForm.value.moyenLivraison;

      this.moyenLivraisonService.updateMoyenLivraison(this.id, moyenLivraison).subscribe(
        response => {
          console.log('Moyen de livraison mis à jour avec succès.', response);
          this.router.navigate(['/moyenLivraison']); // Navigate back to moyen de livraison list after update
        },
        error => {
          console.error('Erreur lors de la mise à jour du moyen de livraison :', error);
        }
      );
    } else {
      console.log('Form is invalid'); // Add this line to debug
    }
  }
}
