import { Component, OnInit } from '@angular/core';
import { SituationFamilialeService } from 'src/app/Services/SituationFamiliale/situation-familiale.service';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-situation-familiale',
  templateUrl: './situation-familiale.component.html',
  styleUrls: ['./situation-familiale.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class SituationFamilialeComponent implements OnInit {
  situations$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  deletesituationId: number | null = null;
  nomFilter: string = '';
  filteredSituations: any[] = [];
  sortColumn: string = 'situationFamiliale'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction

  constructor(private situationFamilialeService: SituationFamilialeService) { }

  ngOnInit(): void {
    this.getAllSituations();
  }

  getAllSituations(): void {
    this.situations$ = this.situationFamilialeService.getAllSituationsFamiliales().pipe(
      map(situations => {
        this.filteredSituations = this.searchByNom(situations, this.nomFilter);
        this.collectionSize = this.filteredSituations.length;
        this.filteredSituations = this.sortSituations(this.filteredSituations, this.sortColumn, this.sortDirection);
        return this.filteredSituations.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllSituations();
  }

  refreshSituations() {
    this.getAllSituations();
  }

  deleteSituationById(id: number): void {
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
        this.situationFamilialeService.deleteSituationFamiliale(id).subscribe(
          () => {
            this.getAllSituations();
            this.deletesituationId = null;
          }
        );
      }
    });
  }

  filterByNom(): void {
    this.page = 1; // Reset page number when filter changes
    this.getAllSituations();
  }

  searchByNom(situations: any[], filter: string): any[] {
    if (!filter.trim()) {
      return situations;
    }
    const sanitizedFilter = filter.toLowerCase();
    return situations.filter(situation =>
      situation.situationFamiliale.toLowerCase().includes(sanitizedFilter)
    );
  }

  sortSituations(situations: any[], column: string, direction: string): any[] {
    return situations.sort((a, b) => {
      const res = (a[column] < b[column]) ? -1 : (a[column] > b[column]) ? 1 : 0;
      return direction === 'asc' ? res : -res;
    });
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.getAllSituations();
  }
}
