import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { PosteService } from 'src/app/Services/Poste/poste.service';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { ProjetEmployePosteService } from 'src/app/Services/ProjetEmployePoste/projet-employe-poste.service';

@Component({
  selector: 'app-create-projet-employe-poste',
  templateUrl: './create-projet-employe-poste.component.html',
  styleUrls: ['./create-projet-employe-poste.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CreateProjetEmployePosteComponent implements OnInit {

  newProjetEmployePoste!: FormGroup;
  formSubmitted: boolean = false;
  employes: any[] = [];
  projets: any[] = [];
  postes: any[] = [];

  constructor(
    private projetEmployePosteService: ProjetEmployePosteService,
    private employeService: EmployeService,
    private formBuilder: FormBuilder,
    private projetService: ProjetService,
    private posteService: PosteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEmployes();
    this.loadProjets();
    this.loadPostes();
  }

  initForm(): void {
    this.newProjetEmployePoste = this.formBuilder.group({
      projet_id: ['', Validators.required],
      poste_id: ['', Validators.required],
      employe_id: ['', Validators.required],
      duree: ['', Validators.required]
    });
  }

  loadEmployes(): void {
    this.employeService.getAll().subscribe(
      (data: any[]) => {
        this.employes = data;
      },
      error => {
        console.log('Error loading employes:', error);
      }
    );
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      (data: any[]) => {
        this.projets = data;
      },
      error => {
        console.log('Error loading projets:', error);
      }
    );
  }

  loadPostes(): void {
    this.posteService.getAllPostes().subscribe(
      (data: any[]) => {
        this.postes = data;
      },
      error => {
        console.log('Error loading postes:', error);
      }
    );
  }

  createProjetEmployePoste(): void {
    this.formSubmitted = true;
    if (this.newProjetEmployePoste.valid) {
      const projetEmployePosteData = this.newProjetEmployePoste.value;
      this.projetEmployePosteService.createProjetEmployePoste(projetEmployePosteData).subscribe(
        response => {
          console.log('Projet employe poste created successfully:', response);
          // Reset the form after successful creation
          this.newProjetEmployePoste.reset();
          this.router.navigate(['/getEmployePoste']);
          // Reload the list of ProjetEmployePostes after creation
          // this.loadProjetEmployePostes();
        },
        error => {
          console.log('Error creating projet employe poste:', error);
        }
      );
    }
  }
}
