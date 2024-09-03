import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { EmployeExperienceService } from 'src/app/Services/EmployeExperience/employe-experience.service';

@Component({
  selector: 'app-put-employe-experience',
  templateUrl: './put-employe-experience.component.html',
  styleUrls: ['./put-employe-experience.component.css','../../../../assets/css/bootstrap.min.css']
})
export class PutEmployeExperienceComponent {
  id!: number;
  experienceForm: FormGroup = this.formBuilder.group({
    employeExperiencePoste: ['', Validators.required],
    employeExperienceOragnismeEmployeur: ['', Validators.required],
    employeExperiencePeriode: ['', Validators.required],
    employeExperienceFonctionOccupe: ['', Validators.required],
    employeId: ['', Validators.required],

  });
  employes: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeExperienceService: EmployeExperienceService,
    private employeService: EmployeService
 , private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEmployerExperience(this.id);
    });

    this.initForm();
    this. loadEmploye();

  }

  initForm(): void {
    this.experienceForm= this.formBuilder.group({
      employeExperiencePoste: ['', Validators.required],
      employeExperienceOragnismeEmployeur: ['', Validators.required],
      employeExperiencePeriode: ['', Validators.required],
      employeExperienceFonctionOccupe: ['', Validators.required],
      employeId: ['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const formData = this.experienceForm.value;

      this.employeExperienceService.updateEmployeExperience(this.id, formData)
        .subscribe(
          response => {
            console.log('Appel d\'offre mis à jour avec succès:', response);
            this.experienceForm.reset();
            this.router.navigate(['/getExperience']);
          },
          error => {
            console.log('Erreur lors de la mise à jour de l\'appel d\'offre:', error);
          }
        );
    }
  }

  loadEmployerExperience(id: number): void {
    this.employeExperienceService.getEmployeExperience(id).subscribe(
      (data: any) => {
        this.experienceForm.patchValue(data); // Assign the fetched data to the form
      },
      error => {
        console.log('Erreur lors du chargement de l\'appel d\'offre:', error);
      }
    );
  }

  loadEmploye(): void {
    this.employeService.getAll().subscribe(
      (data: any[]) => {
        this. employes = data;
      },
      error => {
        console.log('Erreur lors du chargement des types d\'appel d\'offres:', error);
      }
    );
  }


}
