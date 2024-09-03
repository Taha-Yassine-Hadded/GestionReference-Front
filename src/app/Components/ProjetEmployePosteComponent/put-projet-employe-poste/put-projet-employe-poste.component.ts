import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import { PosteService } from 'src/app/Services/Poste/poste.service';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { ProjetEmployePosteService } from 'src/app/Services/ProjetEmployePoste/projet-employe-poste.service';

@Component({
  selector: 'app-put-projet-employe-poste',
  templateUrl: './put-projet-employe-poste.component.html',
  styleUrls: ['./put-projet-employe-poste.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class PutProjetEmployePosteComponent implements OnInit {
  id!: number;
  projetPosteEmployeForm:FormGroup = this.formBuilder.group({
    projet_id: ['', Validators.required],
      poste_id: ['', Validators.required],
      employe_id: ['', Validators.required],
      duree: ['', Validators.required]
    });
  projets: any[] = [];
  postes: any[] = [];
  employes: any[] = [];

  constructor(
    private projetPosteEmployeService: ProjetEmployePosteService,
    private projetService: ProjetService,
    private employeService: EmployeService,
    private posteService: PosteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadProjets();
    this.loadPostes();
    this.loadEmployes();
    this.loadProjetPosteEmploye();
  }

  initForm(): void {
    this.projetPosteEmployeForm = this.formBuilder.group({
      projet_id: ['', Validators.required],
      poste_id: ['', Validators.required],
      employe_id: ['', Validators.required],
      duree: ['', Validators.required]
    });
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      data => {
        this.projets = data;
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  loadPostes(): void {
    this.posteService.getAllPostes().subscribe(
      data => {
        this.postes = data;
      },
      error => {
        console.error('Error loading postes:', error);
      }
    );
  }

  loadEmployes(): void {
    this.employeService.getAll().subscribe(
      data => {
        this.employes = data;
      },
      error => {
        console.error('Error loading employes:', error);
      }
    );
  }

  loadProjetPosteEmploye(): void {
    if (this.id) {
      this.projetPosteEmployeService.getProjetEmployePosteById(this.id).subscribe(
        data => {
          this.projetPosteEmployeForm.patchValue(data);
        },
        error => {
          console.error('Error loading projet poste employe:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.projetPosteEmployeForm.valid) {
      const projetPosteEmployeData = this.projetPosteEmployeForm.value;

      const request = this.id ?
        this.projetPosteEmployeService.updateProjetEmployePoste(this.id, projetPosteEmployeData) :
        this.projetPosteEmployeService.createProjetEmployePoste(projetPosteEmployeData);

      request.subscribe(
        response => {
          console.log(`Projet poste employe ${this.id ? 'updated' : 'created'} successfully:`, response);
          this.router.navigate(['/getEmployePoste']); // Navigate back to list
        },
        error => {
          console.error(`Error ${this.id ? 'updating' : 'creating'} projet poste employe:`, error);
        }
      );
    }
  }
}
