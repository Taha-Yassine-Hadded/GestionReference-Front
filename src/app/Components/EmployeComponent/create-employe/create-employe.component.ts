import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { LangueService } from 'src/app/Services/Langue/langue.service';
import { NationaliteService } from 'src/app/Services/Nationalite/nationalite.service';
import { SituationFamilialeService } from 'src/app/Services/SituationFamiliale/situation-familiale.service';
import { PosteService } from 'src/app/Services/Poste/poste.service';
import { ActivatedRoute, Router } from '@angular/router';
import {EmployePosteService} from "../../../Services/EmployePoste/employe-poste.service";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {config} from "rxjs";

@Component({
  selector: 'app-create-employe',
  templateUrl: './create-employe.component.html',
  styleUrls: ['./create-employe.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateEmployeComponent implements OnInit {

  employeForm!: FormGroup;
  //langues: any[] = [];
  situationsFamiliales: any[] = [];
  postes: any[] = [];
  submitButtonClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private employeService: EmployeService,
    //private langueService: LangueService,
    private situationFamilialeService: SituationFamilialeService,
    private posteService: EmployePosteService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initEmployeForm();
    //this.loadLangues();
    this.loadSituationsFamiliales();
    this.loadPostes();
  }

  initEmployeForm(): void {
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

  /*
  loadLangues(): void {
    this.langueService.getAllLangues().subscribe(
      (data) => {
        this.langues = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
   */

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

  createEmploye(): void {
    this.submitButtonClicked = true;
    if (this.employeForm.valid) {
      const formData = this.employeForm.value;
      this.employeService.create(formData).subscribe(
        (response) => {
          console.log(response);
          // Réinitialisez les champs du nouvel employé après la création réussie si nécessaire
          this.employeForm.reset();
          this.router.navigate(['/getEmploye']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  protected readonly Editor = Editor;
  protected readonly config = config;
}
