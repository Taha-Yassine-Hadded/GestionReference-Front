import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LieuService } from 'src/app/Services/Lieu/lieu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lieux',
  templateUrl: './lieux.component.html',
  styleUrls: ['./lieux.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class LieuxComponent implements OnInit {
  lieux$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filteredLieux: any[] = [];
  sortColumn: string = 'lieuLibelle';
  sortDirection: string = 'asc';

  constructor(private lieuService: LieuService) { }

  ngOnInit(): void {
    this.getAllLieux();
  }

  getAllLieux(): void {
    this.lieux$ = this.lieuService.getAllLieux().pipe(
      map(lieux => {
        this.filteredLieux = this.searchByLibelle(lieux, this.libelleFilter);
        this.collectionSize = this.filteredLieux.length;
        this.filteredLieux = this.sortLieux(this.filteredLieux, this.sortColumn, this.sortDirection);
        return this.filteredLieux.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllLieux();
  }

  refreshLieux(): void {
    this.getAllLieux();
  }

  filterByLibelle(): void {
    this.getAllLieux();
  }

  searchByLibelle(lieux: any[], filter: string): any[] {
    if (!filter.trim()) {
      return lieux;
    }
    const sanitizedFilter = filter.toLowerCase();
    return lieux.filter(lieu =>
      lieu.lieuLibelle.toLowerCase().includes(sanitizedFilter) ||
      lieu.paysLibelle.toLowerCase().includes(sanitizedFilter)
    );
  }

  sortLieux(lieux: any[], column: string, direction: string): any[] {
    return lieux.sort((a, b) => {
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
    this.getAllLieux();
  }

  deleteLieu(id: number): void {
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
        this.lieuService.deleteLieu(id).subscribe(
          () => {
            console.log('Lieu supprimé avec succès');
            this.getAllLieux(); // Refresh the list after deletion
          }
        );
      }
    });
  }
}
