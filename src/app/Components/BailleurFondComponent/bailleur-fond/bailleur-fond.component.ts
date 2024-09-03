import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import Swal from "sweetalert2";
import { BailleurFondService } from "../../../Services/BailleurFond/bailleur-fond.service";

@Component({
  selector: 'app-bailleur-fond',
  templateUrl: './bailleur-fond.component.html',
  styleUrls: ['./bailleur-fond.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class BailleurFondComponent implements OnInit {
  bailleurFondList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'bailleurFondLibelle';
  sortDirection: string = 'asc';

  constructor(private bailleurFondService: BailleurFondService) {}

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
    this.bailleurFondList$ = this.bailleurFondService.getAll().pipe(
      map(bailleur => {
        this.filterResult = this.searchByLibelle(bailleur, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortBailleurs(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(bailleurList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return bailleurList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return bailleurList.filter(bailleur =>
      bailleur.bailleurFondLibelle.toLowerCase().includes(sanitizedFilter) ||
      bailleur.bailleurFondAcronyme.toLowerCase().includes(sanitizedFilter)
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
        this.bailleurFondService.delete(id).subscribe(
          () => {
            console.log('Pays supprimé avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortBailleurs(bailleurList: any[], column: string, direction: string): any[] {
    return bailleurList.sort((a, b) => {
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
