import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { DevisesService } from "../../../Services/Devises/devises.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-devises',
  templateUrl: './devises.component.html',
  styleUrls: ['./devises.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class DevisesComponent implements OnInit {
  devisesList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'devisesLibelle';
  sortDirection: string = 'asc';

  constructor(private devisesService: DevisesService) { }

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
    this.devisesList$ = this.devisesService.getAll().pipe(
      map(devises => {
        this.filterResult = this.searchByLibelle(devises, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortDevises(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(devisesList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return devisesList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return devisesList.filter(devises =>
      devises.devisesLibelle.toLowerCase().includes(sanitizedFilter) ||
      devises.devisesAcronyme.toLowerCase().includes(sanitizedFilter)
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
        this.devisesService.delete(id).subscribe(
          () => {
            console.log('Devises supprimé avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortDevises(devisesList: any[], column: string, direction: string): any[] {
    return devisesList.sort((a, b) => {
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
