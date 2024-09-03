import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import {ContinentService} from "../../../Services/Continent/continent.service";

@Component({
  selector: 'app-put-lieux',
  templateUrl: './put-lieux.component.html',
  styleUrls: ['./put-lieux.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class PutLieuxComponent {
  id!: number;
  formSubmitted: boolean = false;
  lieuForm: FormGroup;
  pays: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private paysService: PaysService,
    private lieuService: LieuService,
    private router: Router
  ) {
    this.lieuForm = this.formBuilder.group({
      lieuLibelle: ['', Validators.required],
      paysId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadLieu(this.id);
    });

    this.loadPays();
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.lieuForm.valid) {
      const formData = this.lieuForm.value;

      this.lieuService.updateLieu(this.id, formData)
        .subscribe(
          response => {
            console.log('Lieu mis à jour avec succès:', response);
            this.router.navigate(['/getLieu']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du lieu:', error);
          }
        );
    }
  }

  loadLieu(id: number): void {
    this.lieuService.getLieuById(id).subscribe(
      (data: any) => {
        console.log(data);
        // Patch des valeurs individuelles dans le formulaire
        this.lieuForm.patchValue({
          lieuLibelle: data.lieuLibelle,
          paysId: data.paysId
        });
      },
      error => {
        console.log('Erreur lors du chargement du lieu:', error);
      }
    );
  }

  loadPays(): void {
    this.paysService.getAllPays().subscribe(
      (data: any[]) => {
        this.pays = data;
      },
      error => {
        console.log('Erreur lors du chargement des pays:', error);
      }
    );
  }
}
