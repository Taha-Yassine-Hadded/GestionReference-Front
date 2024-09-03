import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { ProjetPreuveService } from 'src/app/Services/ProjetPreuve/projet-preuve.service';

@Component({
  selector: 'app-put-projet-preuve',
  templateUrl: './put-projet-preuve.component.html',
  styleUrls: ['./put-projet-preuve.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class PutProjetPreuveComponent implements OnInit {
  projetPreuves: any[] = [];
  projetPreuveForm!: FormGroup;
  projets: any[] = [];

  constructor(
    private projetPreuveService: ProjetPreuveService,
    private projetService: ProjetService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadProjetPreuves();
    this.loadProjets();

    this.loadProjetPreuveFromRouteParams();
  }

  initializeForm(): void {
    this.projetPreuveForm = this.formBuilder.group({
      projetPreuveLibelle: ['', Validators.required],
      projetId: ['', Validators.required]
    });
  }

  loadProjetPreuves(): void {
    this.projetPreuveService.getAllProjetPreuves().subscribe(
      data => {
        this.projetPreuves = data;
      },
      error => {
        console.error('Error loading projetPreuves:', error);
      }
    );
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

  loadProjetPreuveFromRouteParams(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProjetPreuve(id);
      }
    });
  }

  loadProjetPreuve(id: number): void {
    this.projetPreuveService.getProjetPreuveById(id).subscribe(
      data => {
        this.projetPreuveForm.patchValue(data);
      },
      error => {
        console.error('Error loading projetPreuve:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.projetPreuveForm.valid) {
      const projetPreuveData = this.projetPreuveForm.value;
      const id = +this.route.snapshot.params['id'];

      const request = id ?
        this.projetPreuveService.updateProjetPreuve(id, projetPreuveData) :
        this.projetPreuveService.createProjetPreuve(projetPreuveData);

      request.subscribe(
        response => {
          console.log(`Projet preuve ${id ? 'updated' : 'created'} successfully:`, response);
          this.router.navigate(['/getPreuve']); // Navigate back to list
        },
        error => {
          console.error(`Error ${id ? 'updating' : 'creating'} projet preuve:`, error);
        }
      );
    }
  }

  deleteProjetPreuve(id: number): void {
    if (confirm('Are you sure you want to delete this projet preuve?')) {
      this.projetPreuveService.deleteProjetPreuve(id).subscribe(
        response => {
          console.log('Projet preuve deleted successfully:', response);
          this.loadProjetPreuves();
        },
        error => {
          console.error('Error deleting projet preuve:', error);
        }
      );
    }
  }
}
