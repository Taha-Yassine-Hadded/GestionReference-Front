import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { TypeDocumentService } from "../../../Services/TypeDocument/type-document.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-type-document',
  templateUrl: './type-document.component.html',
  styleUrls: ['./type-document.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class TypeDocumentComponent implements OnInit {
  typeDocumentsList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'typeDocumentLibelle';
  sortDirection: string = 'asc';

  constructor(private typeDocumentService: TypeDocumentService) { }

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
    this.typeDocumentsList$ = this.typeDocumentService.getAll().pipe(
      map(typeDocuments => {
        this.filterResult = this.searchByLibelle(typeDocuments, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortTypeDocuments(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(typeDocumentsList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return typeDocumentsList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return typeDocumentsList.filter(typeDocument =>
      typeDocument.typeDocumentLibelle.toLowerCase().includes(sanitizedFilter)
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
        this.typeDocumentService.delete(id).subscribe(
          () => {
            console.log('Type Document supprimé avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortTypeDocuments(typeDocumentsList: any[], column: string, direction: string): any[] {
    return typeDocumentsList.sort((a, b) => {
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
