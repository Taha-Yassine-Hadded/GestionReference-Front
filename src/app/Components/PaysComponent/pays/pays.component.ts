import { Component, OnInit } from '@angular/core';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class PaysComponent implements OnInit {
  pays$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filteredPays: any[] = [];
  sortColumn: string = 'paysLibelle';
  sortDirection: string = 'asc';

  constructor(private paysService: PaysService) { }

  ngOnInit(): void {
    this.getAllPays();
  }

  onPageChange(): void {
    this.getAllPays();
  }

  refreshPays() {
    this.getAllPays();
  }

  getAllPays(): void {
    this.pays$ = this.paysService.getAllPays().pipe(
      map(pays => {
        this.filteredPays = this.searchByLibelle(pays, this.libelleFilter);
        this.collectionSize = this.filteredPays.length;
        this.filteredPays = this.sortPays(this.filteredPays, this.sortColumn, this.sortDirection);
        return this.filteredPays.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByLibelle(): void {
    this.getAllPays();
  }

  searchByLibelle(pays: any[], filter: string): any[] {
    if (!filter.trim()) {
      return pays;
    }
    const sanitizedFilter = filter.toLowerCase();
    return pays.filter(pays =>
      pays.paysLibelle.toLowerCase().includes(sanitizedFilter) ||
      pays.paysCapitale.toLowerCase().includes(sanitizedFilter) ||
      pays.continentName.toLowerCase().includes(sanitizedFilter)
    );
  }

  deletePaysById(id: number): void {
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
        this.paysService.deletePays(id).subscribe(
          () => {
            console.log('Pays supprimé avec succès');
            this.getAllPays();
          }
        );
      }
    });
  }

  sortPays(pays: any[], column: string, direction: string): any[] {
    return pays.sort((a, b) => {
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
    this.getAllPays();
  }
}
