import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppelOffreService } from 'src/app/Services/AppelOffre/appel-offre.service';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appel-offre',
  templateUrl: './appel-offre.component.html',
  styleUrls: [
    './appel-offre.component.css',
    '../../../../assets/css/bootstrap.min.css'
  ]
})
export class AppelOffreComponent implements OnInit {
  appelOffres$: Observable<any[]> = new Observable<any[]>();
  id!: number;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  sortBy: string = '';
  devisFilter: string = '';
  filteredAppelOffres: any[] = [];

  constructor(
    private appelOffreService: AppelOffreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAppelOffres();
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the ID from the route
    });
  }

  getAllAppelOffres(): void {
    this.appelOffres$ = this.appelOffreService.getAllAppelOffres().pipe(
      map(appelOffres => {
        this.filteredAppelOffres = this.searchByDevis(appelOffres, this.devisFilter);
        this.collectionSize = this.filteredAppelOffres.length;
        return this.filteredAppelOffres.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      })
    );
  }

  filterByDevis(): void {
    this.getAllAppelOffres();
  }

  searchByDevis(appelOffres: any[], filter: string): any[] {
    if (!filter.trim()) {
      return appelOffres;
    }
    const sanitizedFilter = filter.toLowerCase();
    return appelOffres.filter(appelOffre => {
      const devis = appelOffre.appelOffreDevis.toString().toLowerCase(); // Convert to lowercase for case-insensitive comparison
      return devis.includes(sanitizedFilter); // Check if the devis includes the filter string
    });
  }
  onPageChange(): void {
    this.getAllAppelOffres();
  }

  refreshCountries(): void {
    this.getAllAppelOffres();
  }
  
  sortByDate(): void {
    this.appelOffres$ = this.appelOffres$.pipe(
        map(appelOffres => {
            // Tri des éléments
            const sortedAppelOffres = appelOffres.slice().sort((a, b) => {
                const dateA = new Date(a.appelOffreDateRemise).getTime();
                const dateB = new Date(b.appelOffreDateRemise).getTime();
                
                if (this.sortBy === 'dateRemiseAsc') {
                    return dateA - dateB; // Tri ascendant
                } else if (this.sortBy === 'dateRemiseDesc') {
                    return dateB - dateA; // Tri descendant
                }
                
                // Par défaut, retourne un tri ascendant
                return dateA - dateB;
            });

            // Application de la pagination après le tri
            return sortedAppelOffres.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        })
    );
}

deleteAppelOffre(id: number): void {
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
          this.appelOffreService.deleteAppelOffre(id).subscribe(
              () => {
                  console.log('Appel d\'offre supprimé avec succès');
                  this.getAllAppelOffres();
              }
          );
      } 
  });
}
getParticipationLabel(participation: number): string {
  return participation === 1 ? 'Oui' : 'Non';
}
}