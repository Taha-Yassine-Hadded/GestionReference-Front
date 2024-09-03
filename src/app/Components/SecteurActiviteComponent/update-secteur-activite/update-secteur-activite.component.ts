import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ContinentService} from "../../../Services/Continent/continent.service";
import {SecteurActiviteService} from "../../../Services/SecteurActivite/secteur-activite.service";

@Component({
  selector: 'app-update-secteur-activite',
  templateUrl: './update-secteur-activite.component.html',
  styleUrls: ['./update-secteur-activite.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class UpdateSecteurActiviteComponent {
  id!: number;
  secteurForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private secteurService : SecteurActiviteService,
    private router: Router
  ) {
    this.secteurForm = this.formBuilder.group({
      secteurActiviteLibelle: ['', Validators.required],
      secteurActiviteDescription: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadSecteur(this.id);
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.secteurForm.valid) {
      const formData = this.secteurForm.value;

      this.secteurService.update(this.id, formData)
        .subscribe(
          response => {
            console.log('Secteur mis à jour avec succès:', response);
            this.router.navigate(['/secteurActivite']);
          },
          error => {
            console.log('Erreur lors de la mise à jour du secteur: ', error);
          }
        );
    }
  }

  loadSecteur(id: number): void {
    this.secteurService.getById(id).subscribe(
      (data: any) => {
        // Patch des valeurs individuelles dans le formulaire
        this.secteurForm.patchValue({
          secteurActiviteLibelle: data.secteurActiviteLibelle,
          secteurActiviteDescription: data.secteurActiviteDescription,
        });
      },
      error => {
        console.log('Erreur lors du chargement du secteur:', error);
      }
    );
  }
}
