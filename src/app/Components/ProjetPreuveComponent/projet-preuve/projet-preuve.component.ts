import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, of } from 'rxjs';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { ProjetService } from 'src/app/Services/Projet/projet.service';
import { ProjetPreuveService } from 'src/app/Services/ProjetPreuve/projet-preuve.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-projet-preuve',
  templateUrl: './projet-preuve.component.html',
  styleUrls: ['./projet-preuve.component.css',
  '../../../../assets/css/bootstrap.min.css']
})
export class ProjetPreuveComponent implements OnInit {

  projetPreuves$: Observable<any[]> = of([]); // Utilisez 'of' pour créer un observable

  projetPreuveForm!: FormGroup;
  projets: any[] = []; // Array to store projects
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  isAdmin: boolean = false; 
  filteredProjetPreuves: any[] = [];
  searchText: string = '';

  constructor(
    private projetPreuveService: ProjetPreuveService,
    private projetService: ProjetService, // Inject the projet service
    private formBuilder: FormBuilder,
    private authService: LoginService
  ) { }

  ngOnInit(): void {
    this.projetPreuveForm = this.formBuilder.group({
      projetPreuveLibelle: ['', Validators.required],
      projetId: ['', Validators.required]
    });

    this.loadProjetPreuves();
    this.loadProjets(); // Load projects for the dropdown
    this.updateAdminStatus(); 
  }

  updateAdminStatus() {
    this.isAdmin = this.authService.isAdmin();
  }

  searchByName(projetPreuves: any[], filter: string): any[] {
    if (!filter.trim()) {
      return projetPreuves;
    }
    const sanitizedFilter = filter.toLowerCase();
    return projetPreuves.filter(projetPreuve =>
      projetPreuve.projet.toLowerCase().includes(sanitizedFilter)
    );
  }
  
  filterByNom(): void {
    // Reload experiences when search is performed
    this.page = 1; // Reset page number to first page
    this.loadProjetPreuves();
  }

  loadProjetPreuves(): void {
    this.projetPreuves$ = this.projetPreuveService.getAllProjetPreuves().pipe(
      catchError(error => {
        console.error('Error occurred while fetching experiences:', error);
        return of([]); // Return empty array in case of error
      })
    );
    
    this.projetPreuves$.subscribe(data => {
      this.filteredProjetPreuves = this.searchByName(data, this.searchText);
      this.collectionSize = this.filteredProjetPreuves.length;
      return this.filteredProjetPreuves.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    });
  }

  onPageChange(): void {
    this.loadProjetPreuves();
  }

  refreshCountries() {
    this.loadProjetPreuves();
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



  deleteProjetPreuve(id: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Êtes-vous sûr(e) ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimer !",
        cancelButtonText: "Non, annuler",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
                title: "Supprimé !",
                text: "Votre donnée a été supprimée.",
                icon: "success"
            });
            this.projetPreuveService.deleteProjetPreuve(id).subscribe(
              response => {
                console.log('Projet preuve deleted successfully:', response);
                this.loadProjetPreuves();
              }
            );
        }
    });
  }
}
