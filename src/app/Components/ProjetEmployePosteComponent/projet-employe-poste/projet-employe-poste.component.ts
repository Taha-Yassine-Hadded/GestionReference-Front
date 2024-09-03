import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProjetEmployePosteService } from 'src/app/Services/ProjetEmployePoste/projet-employe-poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projet-employe-poste',
  templateUrl: './projet-employe-poste.component.html',
  styleUrls: ['./projet-employe-poste.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class ProjetEmployePosteComponent implements OnInit {
  projetEmployePostes$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  searchText: string = '';
  filteredProjetEmployePostes: any[] = [];

  constructor(private projetEmployePosteService: ProjetEmployePosteService) {}

  ngOnInit(): void {
    this.loadProjetEmployePostes();
  }

  loadProjetEmployePostes(): void {
    this.projetEmployePostes$ = this.projetEmployePosteService.getAllProjetEmployePostes().pipe(
      map(projetEmployePostes => {
        this.filteredProjetEmployePostes = this.searchByName(projetEmployePostes, this.searchText);
        this.collectionSize = this.filteredProjetEmployePostes.length;
        return this.filteredProjetEmployePostes.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      }),
      catchError((error) => {
        console.error('Error occurred while fetching projetEmployePostes: ', error);
        return of([]); // Return empty array in case of error
      })
    );
  }

  onPageChange(): void {
    this.loadProjetEmployePostes();
  }

  refreshProjetEmployePostes(): void {
    this.loadProjetEmployePostes();
  }

  filterByNom(): void {
   
    this.loadProjetEmployePostes();
  }

  searchByName(projetEmployePostes: any[], filter: string): any[] {
    if (!filter.trim()) {
      return projetEmployePostes;
    }
    const sanitizedFilter = filter.toLowerCase();
    return projetEmployePostes.filter(projetEmployePoste =>
      projetEmployePoste.employe.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteProjetEmployePoste(id: number): void {
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
        this.projetEmployePosteService.deleteProjetEmployePoste(id).subscribe(
          response => {
            console.log('Projet employe poste deleted successfully:', response);
            this.loadProjetEmployePostes(); // Refresh the list after deletion
          }
        );
      }
    });
  }
}
