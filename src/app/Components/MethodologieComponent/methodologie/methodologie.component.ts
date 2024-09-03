import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import Swal from "sweetalert2";
import { MethodologieService } from "../../../Services/Methodologie/methodologie.service";

@Component({
  selector: 'app-methodologie',
  templateUrl: './methodologie.component.html',
  styleUrls: ['./methodologie.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class MethodologieComponent implements OnInit {
  methodologieList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'methodologieLibelle';
  sortDirection: string = 'asc';

  constructor(private methodologieService: MethodologieService) { }

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
    this.methodologieList$ = this.methodologieService.getAll().pipe(
      map(methodologie => {
        this.filterResult = this.searchByLibelle(methodologie, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortMethodologies(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(methodologieList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return methodologieList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return methodologieList.filter(methodologie =>
      methodologie.methodologieLibelle.toLowerCase().includes(sanitizedFilter) ||
      methodologie.methodologieDescription.toLowerCase().includes(sanitizedFilter)
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
        this.methodologieService.delete(id).subscribe(
          () => {
            console.log('Méthodologie supprimée avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortMethodologies(methodologieList: any[], column: string, direction: string): any[] {
    return methodologieList.sort((a, b) => {
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
