import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { OrganismeDemandeurService } from 'src/app/Services/OrganismeDemandeur/organisme-demandeur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-organisme-demandeur',
  templateUrl: './organisme-demandeur.component.html',
  styleUrls: ['./organisme-demandeur.component.css','../../../../assets/css/bootstrap.min.css']
})
export class OrganismeDemandeurComponent implements OnInit {
  organismes$: Observable<any[]> = new Observable<any[]>();
  id!: number;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredOrganismes: any[] = [];

  constructor(
    private organismeDemandeurService: OrganismeDemandeurService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllOrganismes();
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the ID from the route
    });
  }

  getAllOrganismes(): void {
    this.organismes$ = this.organismeDemandeurService.getAllOrganismesDemandeurs().pipe(
      map(organismes => {
        this.filteredOrganismes = this.searchByNom(organismes, this.nomFilter);
        this.collectionSize = this.filteredOrganismes.length;
        return this.filteredOrganismes.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByNom(): void {
    this.getAllOrganismes();
  }

  searchByNom(organismes: any[], filter: string): any[] {
    if (!filter.trim()) {
      return organismes;
    }
    const sanitizedFilter = filter.toLowerCase();
    return organismes.filter(organisme =>
      // Replace 'nom' with the actual property you want to filter by
      organisme.organismeDemandeurLibelle.toLowerCase().includes(sanitizedFilter)
    );
  }

  onPageChange(): void {
    this.getAllOrganismes();
  }

  refreshOrganismes(): void {
    this.getAllOrganismes();
  }

  deleteOrganismeDemandeur(id: number): void {
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
              text: "Votre donnée a été supprimé.",
              icon: "success"
            });
            this.organismeDemandeurService.deleteOrganismeDemandeur(id).subscribe(
              () => {
                console.log('Organisme demandeur supprimé avec succès');
                this.getAllOrganismes();
              },)
      } 
  });
}
     
}
