import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategorieService } from 'src/app/Services/Categorie/categorie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CategorieComponent implements OnInit {
  deleteCategorieId: number | null = null;
  categories$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredCategories: any[] = [];
  sortColumn: string = 'categorieLibelle';
  sortDirection: string = 'asc';

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categories$ = this.categorieService.getAllCategories().pipe(
      map(categories => {
        this.filteredCategories = this.searchByName(categories, this.nomFilter);
        this.collectionSize = this.filteredCategories.length;
        this.filteredCategories = this.sortCategories(this.filteredCategories, this.sortColumn, this.sortDirection);
        return this.filteredCategories.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllCategories();
  }

  refreshCategories(): void {
    this.getAllCategories();
  }

  filterByNom(): void {
    this.getAllCategories();
  }

  searchByName(categories: any[], filter: string): any[] {
    if (!filter.trim()) {
      return categories;
    }
    const sanitizedFilter = filter.toLowerCase();
    return categories.filter(category =>
      category.categorieLibelle.toLowerCase().includes(sanitizedFilter) ||
      category.categorieShort.toLowerCase().includes(sanitizedFilter) ||
      category.categorieCodeRef.toLowerCase().includes(sanitizedFilter) ||
      category.categorieCodeCouleur.toLowerCase().includes(sanitizedFilter)
    );
  }

  sortCategories(categories: any[], column: string, direction: string): any[] {
    return categories.sort((a, b) => {
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
    this.getAllCategories();
  }

  deleteCategorieById(id: number): void {
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
        this.categorieService.deleteCategorie(id).subscribe(
          () => {
            this.getAllCategories(); // Refresh the list after deletion
            this.deleteCategorieId = null;
          }
        );
      }
    });
  }
}
