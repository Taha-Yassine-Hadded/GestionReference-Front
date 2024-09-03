import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { NatureClientService } from 'src/app/Services/NatureClient/nature-client.service';

@Component({
  selector: 'app-nature-client',
  templateUrl: './nature-client.component.html',
  styleUrls: ['./nature-client.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class NatureClientComponent implements OnInit {
  natures$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private natureClientService: NatureClientService) { }

  ngOnInit(): void {
    this.getAllNature();
  }

  onPageChange(): void {
    this.getAllNature();
  }

  refreshNatures(): void {
    this.getAllNature();
  }

  getAllNature(): void {
    this.natures$ = this.natureClientService.getAllNatureClients().pipe(
      map(natures => {
        this.filterResult = this.searchByLibelle(natures, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        if (this.sortColumn) {
          this.filterResult.sort((a, b) => this.compare(a, b, this.sortColumn, this.sortDirection));
        }
        return this.filterResult.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByLibelle(): void {
    this.getAllNature();
  }

  searchByLibelle(natures: any[], filter: string): any[] {
    if (!filter.trim()) {
      return natures;
    }
    const sanitizedFilter = filter.toLowerCase();
    return natures.filter(nature =>
      nature.natureClientLibelle.toLowerCase().includes(sanitizedFilter) ||
      nature.natureClientDescription.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteNatureById(id: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Non, annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: 'Supprimé !',
          text: 'Votre donnée a été supprimé.',
          icon: 'success'
        });
        this.natureClientService.deleteNatureClient(id).subscribe(() => {
          console.log('Nature du client supprimée avec succès');
          this.getAllNature();
        });
      }
    });
  }

  setSortColumn(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.getAllNature();
  }

  compare(a: any, b: any, column: string, direction: string): number {
    const valueA = a[column];
    const valueB = b[column];

    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }
    return direction === 'asc' ? comparison : -comparison;
  }
}
