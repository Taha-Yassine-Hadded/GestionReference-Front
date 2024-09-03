import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import Swal from "sweetalert2";
import { TechnologieService } from "../../../Services/Technologie/technologie.service";

@Component({
  selector: 'app-technologie',
  templateUrl: './technologie.component.html',
  styleUrls: ['./technologie.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class TechnologieComponent implements OnInit {
  technologies$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'referenceTechnologieLibelle';
  sortDirection: string = 'asc';

  constructor(private technologieService: TechnologieService) { }

  ngOnInit(): void {
    this.getAll();
  }

  onPageChange(): void {
    this.getAll();
  }

  refresh() {
    this.getAll();
  }

  getAll(): void {
    this.technologies$ = this.technologieService.getAll().pipe(
      map(technologies => {
        this.filterResult = this.searchByLibelle(technologies, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortTechnologies(this.filterResult, this.sortColumn, this.sortDirection);
        return this.filterResult.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByLibelle(): void {
    this.getAll();
  }

  searchByLibelle(technologies: any[], filter: string): any[] {
    if (!filter.trim()) {
      return technologies;
    }
    const sanitizedFilter = filter.toLowerCase();
    return technologies.filter(technologie =>
      technologie.referenceTechnologieLibelle.toLowerCase().includes(sanitizedFilter) ||
      technologie.referenceTechnologieDescription.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteById(id: number): void {
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
        this.technologieService.delete(id).subscribe(
          () => {
            console.log('Technologie supprimée avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortTechnologies(technologies: any[], column: string, direction: string): any[] {
    return technologies.sort((a, b) => {
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
    this.getAll();
  }
}
