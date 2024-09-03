import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { EmployeExperienceService } from 'src/app/Services/EmployeExperience/employe-experience.service';

@Component({
  selector: 'app-create-employe-experience',
  templateUrl: './create-employe-experience.component.html',
  styleUrls: ['./create-employe-experience.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateEmployeExperienceComponent {
  formData: any = {}; // Utilisez ce formulaire pour stocker les données du formulaire
  employes: any[] = [];
  formSubmitted: boolean = false;
  constructor(private employeExperienceService: EmployeExperienceService, private employeService: EmployeService, private router: Router) { }

  ngOnInit(): void {
    this.formData = {
      employeId: '' // Initialisez-le avec une chaîne vide ou toute autre valeur correspondant à l'option par défaut
  };
    this.loadEmployes();
  }

  loadEmployes(): void {
    this.employeService.getAll()
      .subscribe(
        employes => {
          this.employes = employes;
        },
        error => {
          console.error('Une erreur est survenue lors du chargement des employés :', error);
          // Traitez l'erreur comme nécessaire
        }
      );
  }

  onSubmit(): void {
    this.formSubmitted = true;
    this.employeExperienceService.createEmployeExperience(this.formData)
      .subscribe(
        () => {
          console.log('Formation employé créée avec succès');
          this.router.navigate(['/getExperience']); // Redirigez vers la liste des formations employé après la création
        },
        error => {
          console.error('Une erreur est survenue lors de la création de la formation employé :', error);
          // Traitez l'erreur comme nécessaire
        }
      );
  }
}
