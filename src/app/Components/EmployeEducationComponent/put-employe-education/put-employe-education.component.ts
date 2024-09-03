import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { EmployeEducationService } from 'src/app/Services/EmployeEducation/employe-education.service';

@Component({
  selector: 'app-put-employe-education',
  templateUrl: './put-employe-education.component.html',
  styleUrls: ['./put-employe-education.component.css',
  '../../../../assets/css/bootstrap.min.css'
 ]
})
export class PutEmployeEducationComponent implements OnInit {
  id!: number;
  educationForm: FormGroup = this.formBuilder.group({
    employeEducationNatureEtudes: ['', Validators.required],
    employeEducationEtablissement: ['', Validators.required],
    employeEducationDiplomes: ['', Validators.required],
    employeEducationAnneeObtention: ['', Validators.required],
    employeId: ['', Validators.required],

  });
  employes: any[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeEducationService: EmployeEducationService,
    private employeService: EmployeService
 , private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEmployerEducation(this.id);
    });

    this.initForm();
    this. loadEmploye();

  }

  initForm(): void {
    this.educationForm = this.formBuilder.group({
      employeEducationNatureEtudes: ['', Validators.required],
      employeEducationEtablissement: ['', Validators.required],
      employeEducationDiplomes: ['', Validators.required],
      employeEducationAnneeObtention: ['', Validators.required],
      employeId: ['', Validators.required],

    });
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const formData = this.educationForm.value;

      this.employeEducationService.updateEmployeEducation(this.id, formData)
        .subscribe(
          response => {
            console.log('Appel d\'offre mis à jour avec succès:', response);
            this.educationForm.reset();
            this.router.navigate(['/getEducation']);
          },
          error => {
            console.log('Erreur lors de la mise à jour de l\'appel d\'offre:', error);
          }
        );
    }
  }

  loadEmployerEducation(id: number): void {
    this.employeEducationService.getEmployeEducation(id).subscribe(
      (data: any) => {
        this.educationForm.patchValue(data); // Assign the fetched data to the form
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
