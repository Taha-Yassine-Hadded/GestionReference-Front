import { Component } from '@angular/core';
import {map, Observable} from "rxjs";
import Swal from "sweetalert2";
import {CvLangueNiveauService} from "../../../Services/CvLangueNiveau/cv-langue-niveau.service";

@Component({
  selector: 'app-cv-langue-niveau',
  templateUrl: './cv-langue-niveau.component.html',
  styleUrls: ['./cv-langue-niveau.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CvLangueNiveauComponent {
  niveauList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'cvLangueNiveauLibelle';
  sortDirection: string = 'asc';

  constructor(private cvLangueNiveauService: CvLangueNiveauService) { }

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
    this.niveauList$ = this.cvLangueNiveauService.getAll().pipe(
      map(niveaux => {
        this.filterResult = this.searchByLibelle(niveaux, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortCvLangueNiveau(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(niveauList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return niveauList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return niveauList.filter(niveau =>
      niveau.cvLangueNiveauLibelle.toLowerCase().includes(sanitizedFilter)
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
        this.cvLangueNiveauService.delete(id).subscribe(
          () => {
            console.log('Langue niveau supprimé avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortCvLangueNiveau(niveauList: any[], column: string, direction: string): any[] {
    return niveauList.sort((a, b) => {
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
