import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { SecteurActiviteService } from '../../../Services/SecteurActivite/secteur-activite.service';

@Component({
  selector: 'app-secteur-activite',
  templateUrl: './secteur-activite.component.html',
  styleUrls: ['./secteur-activite.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class SecteurActiviteComponent implements OnInit {
  secteurList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private secteurService: SecteurActiviteService) {}

  ngOnInit(): void {
    this.getAll();
  }

  onPageChange(): void {
    this.getAll();
  }

  refresh(): void {
    this.getAll();
  }

  getAll(): void {
    this.secteurList$ = this.secteurService.getAll().pipe(
      map(secteur => {
        this.filterResult = this.searchByLibelle(secteur, this.libelleFilter);
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
    this.getAll();
  }

  searchByLibelle(secteurList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return secteurList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return secteurList.filter(secteur =>
      secteur.secteurActiviteLibelle.toLowerCase().includes(sanitizedFilter) ||
      secteur.secteurActiviteDescription.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteById(id: number): void {
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
        this.secteurService.delete(id).subscribe(() => {
          console.log('Secteur supprimé avec succès');
          this.getAll();
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
    this.getAll();
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
