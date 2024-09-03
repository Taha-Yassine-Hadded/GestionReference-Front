import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import {LieuService} from "../../../Services/Lieu/lieu.service";
import {ContinentService} from "../../../Services/Continent/continent.service";

@Component({
  selector: 'app-put-pays',
  templateUrl: './put-pays.component.html',
  styleUrls: ['./put-pays.component.css',
  '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutPaysComponent {
  id!: number;
  paysForm: FormGroup;
  formSubmitted: boolean = false;
  continents: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private continentService: ContinentService,
    private paysService: PaysService,
    private router: Router
  ) {
    this.paysForm = this.formBuilder.group({
      paysLibelle: ['', Validators.required],
      paysCapitale: ['', Validators.required],
      continentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadPays(this.id);
    });

    this.loadContinents();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.paysForm.valid) {
      const formData = this.paysForm.value;

      this.paysService.updatePays(this.id, formData)
        .subscribe(
          response => {
            console.log('Pays mis à jour avec succès:', response);
            this.router.navigate(['/getPays']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du pays:', error);
          }
        );
    }
  }

  loadPays(id: number): void {
    this.paysService.getPaysById(id).subscribe(
      (data: any) => {
        console.log(data);
        // Patch des valeurs individuelles dans le formulaire
        this.paysForm.patchValue({
          paysLibelle: data.paysLibelle,
          paysCapitale: data.paysCapitale,
          continentId: data.continentId
        });
      },
      error => {
        console.log('Erreur lors du chargement du pays:', error);
      }
    );
  }

  loadContinents(): void {
    this.continentService.getAll().subscribe(
      (data: any[]) => {
        this.continents = data;
      },
      error => {
        console.log('Erreur lors du chargement des continents:', error);
      }
    );
  }
}


