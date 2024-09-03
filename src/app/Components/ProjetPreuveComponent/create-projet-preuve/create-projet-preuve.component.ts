import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { ProjetPreuveService } from 'src/app/Services/ProjetPreuve/projet-preuve.service';

@Component({
  selector: 'app-create-projet-preuve',
  templateUrl: './create-projet-preuve.component.html',
  styleUrls: ['./create-projet-preuve.component.css',
  '../../../../assets/css/bootstrap.min.css'
]
})
export class CreateProjetPreuveComponent {
  projetPreuves: any[] = [];
  projetPreuveForm!: FormGroup;
  projets: any[] = []; // Array to store projects
  formSubmitted: boolean = false; 

  constructor(
    private projetPreuveService: ProjetPreuveService,
    private projetService: ProjetService, // Inject the projet service
    private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projetPreuveForm = this.formBuilder.group({
      projetPreuveLibelle: ['', Validators.required],
      projetId: ['', Validators.required]
    });

    this.loadProjets(); // Load projects for the dropdown
  }

  

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe(
      data => {
        this.projets = data;
      },
      error => {
        console.log('Error loading projects:', error);
      }
    );
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.projetPreuveForm.valid) {
      const projetPreuveData = this.projetPreuveForm.value;

      this.projetPreuveService.createProjetPreuve(projetPreuveData).subscribe(
        response => {
          console.log('Projet preuve created successfully:', response);
          this.projetPreuveForm.reset();
          this.router.navigate(['/getPreuve']);
        },
        error => {
          console.log('Error creating projet preuve:', error);
        }
      );
    }
  }}