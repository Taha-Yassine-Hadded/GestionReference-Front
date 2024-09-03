import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LangueService } from 'src/app/Services/Langue/langue.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-langue',
  templateUrl: './langue.component.html',
  styleUrls: ['./langue.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class LangueComponent implements OnInit {
  langues$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredLangues: any[] = [];
  sortColumn: string = 'langueNom'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction

  constructor(private langueService: LangueService) { }

  ngOnInit(): void {
    this.getAllLangues();
  }

  getAllLangues(): void {
    this.langues$ = this.langueService.getAllLangues().pipe(
      map(langues => {
        this.filteredLangues = this.searchByNom(langues, this.nomFilter);
        this.collectionSize = this.filteredLangues.length;
        this.filteredLangues = this.sortLangues(this.filteredLangues, this.sortColumn, this.sortDirection);
        return this.filteredLangues.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllLangues();
  }

  refreshLangues(): void {
    this.getAllLangues();
  }

  filterByNom(): void {
    this.page = 1; // Reset page number when filter changes
    this.getAllLangues();
  }

  searchByNom(langues: any[], filter: string): any[] {
    if (!filter.trim()) {
      return langues;
    }
    const sanitizedFilter = filter.toLowerCase();
    return langues.filter(langue =>
      langue.langueNom.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteLangueById(id: number): void {
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
        this.langueService.deleteLangue(id).subscribe(
          () => {
            this.getAllLangues(); // Refresh the list after deletion
          }
        );
      }
    });
  }

  sortLangues(langues: any[], column: string, direction: string): any[] {
    return langues.sort((a, b) => {
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
    this.getAllLangues();
  }
}
