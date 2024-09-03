import { Component, OnInit } from '@angular/core';
import { MoyenLivraisonService } from 'src/app/Services/MoyenLivraison/moyen-livraison.service';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moyen-livraison',
  templateUrl: './moyen-livraison.component.html',
  styleUrls: ['./moyen-livraison.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class MoyenLivraisonComponent implements OnInit {
  livraisons$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  sortColumn: string = 'moyenLivraison'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction
  filteredLivraisons: any[] = [];

  constructor(private moyenLivraisonService: MoyenLivraisonService) { }

  ngOnInit(): void {
    this.getAllMoyensLivraison();
  }

  onPageChange(): void {
    this.getAllMoyensLivraison();
  }

  refreshLivraisons() {
    this.getAllMoyensLivraison();
  }

  getAllMoyensLivraison(): void {
    this.livraisons$ = this.moyenLivraisonService.getAllMoyensLivraison().pipe(
      map(livraisons => {
        this.filteredLivraisons = this.searchByNom(livraisons, this.nomFilter);
        this.collectionSize = this.filteredLivraisons.length;
        const sortedLivraisons = this.sortLivraisons(this.filteredLivraisons, this.sortColumn, this.sortDirection);
        return sortedLivraisons.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByNom(): void {
    this.page = 1; // Reset page number when filter changes
    this.getAllMoyensLivraison();
  }

  searchByNom(livraisons: any[], filter: string): any[] {
    if (!filter.trim()) {
      return livraisons;
    }
    const sanitizedFilter = filter.toLowerCase();
    return livraisons.filter(livraison =>
      livraison.moyenLivraison.toLowerCase().includes(sanitizedFilter)
    );
  }

  sortLivraisons(livraisons: any[], column: string, direction: string): any[] {
    return livraisons.sort((a, b) => {
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
    this.getAllMoyensLivraison();
  }

  deleteMoyenLivraisonById(id: number): void {
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
        this.moyenLivraisonService.deleteMoyenLivraison(id).subscribe(
          () => {
            this.getAllMoyensLivraison();
          }
        );
      }
    });
  }
}
