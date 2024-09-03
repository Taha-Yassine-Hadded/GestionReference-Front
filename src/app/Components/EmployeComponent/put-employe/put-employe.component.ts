import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { NationaliteService } from 'src/app/Services/Nationalite/nationalite.service';
import { SituationFamilialeService } from 'src/app/Services/SituationFamiliale/situation-familiale.service';
import { PosteService } from 'src/app/Services/Poste/poste.service';
import { LangueService } from 'src/app/Services/Langue/langue.service';
import {EmployePosteService} from "../../../Services/EmployePoste/employe-poste.service";

@Component({
  selector: 'app-put-employe',
  templateUrl: './put-employe.component.html',
  styleUrls: ['./put-employe.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class PutEmployeComponent implements OnInit {
  id!: number;
  employeForm!: FormGroup;
  nationalites: any[] = [];
  situationsFamiliales: any[] = [];
  postes: any[] = [];
  //langues: any[] = [];
  submitButtonClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private employeService: EmployeService,
    private nationaliteService: NationaliteService,
    private situationFamilialeService: SituationFamilialeService,
    private posteService: EmployePosteService,
    private langueService: LangueService,
    private router: Router
  ) {
    this.employeForm = this.formBuilder.group({
      employeNom: ['', Validators.required],
      employePrenom: ['', Validators.required],
      employeDateNaissance: ['', Validators.required],
      employeLieuNaissance: ['', Validators.required],
      employeAdresse: ['', Validators.required],
      employePrincipaleQualification: ['', Validators.required],
      employeFormationAutre: ['', Validators.required],
      employeAffiliationDesAssociationsGroupPro: ['', Validators.required],
      situationFamilialeId: ['', Validators.required],
      employePosteId: ['', Validators.required],
      employeRemarque: ['']
      //langueId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadEmploye(this.id);
    });

    this.loadSituationsFamiliales();
    this.loadPostes();
    //this.loadLangues();
  }

  loadEmploye(id: number): void {
    this.employeService.getById(id).subscribe(
      (data: any) => {
        console.log(data)
        this.employeForm.patchValue(data);
      },
      (error) => {
        console.log('Erreur lors du chargement de l\'employé :', error);
      }
    );
  }

  loadSituationsFamiliales(): void {
    this.situationFamilialeService.getAllSituationsFamiliales().subscribe(
      (data) => {
        this.situationsFamiliales = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadPostes(): void {
    this.posteService.getAll().subscribe(
      (data) => {
        this.postes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
/*
  loadLangues(): void {
    this.langueService.getAllLangues().subscribe(
      (data: any[]) => {
        this.langues = data;
      },
      error => {
        console.log('Erreur lors du chargement des langues:', error);
      }
    );
  }

 */

  onSubmit(): void {
    this.submitButtonClicked = true
    if (this.employeForm.valid) {
      const formData = this.employeForm.value;

      this.employeService.update(this.id, formData).subscribe(
        response => {
          console.log('Employé mis à jour avec succès:', response);
          this.router.navigate(['/getEmploye']);
        },
        error => {
          console.log('Erreur lors de la mise à jour de l\'employé:', error);
        }
      );
    }
  }
}
