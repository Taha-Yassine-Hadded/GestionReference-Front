import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';
import { ReferenceDocumentsService } from '../../../Services/ReferenceDocuments/reference-documents.service';

@Component({
  selector: 'app-reference-documents',
  templateUrl: './reference-documents.component.html',
  styleUrls: ['./reference-documents.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class ReferenceDocumentsComponent implements OnInit {
  refs$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filteredRef: any[] = [];
  sortColumn: string = 'referenceDocumentsLibelle';
  sortDirection: string = 'asc';

  constructor(private refDocService: ReferenceDocumentsService) { }

  ngOnInit(): void {
    this.getAllRefs();
  }

  getAllRefs(): void {
    this.refs$ = this.refDocService.getAllRefDocument().pipe(
      map(refs => {
        this.filteredRef = this.searchByLibelle(refs, this.libelleFilter);
        this.collectionSize = this.filteredRef.length;
        this.filteredRef = this.sortReferences(this.filteredRef, this.sortColumn, this.sortDirection);
        return this.filteredRef.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllRefs();
  }

  refreshPays(): void {
    this.getAllRefs();
  }

  filterByLibelle(): void {
    this.getAllRefs();
  }

  searchByLibelle(refs: any[], filter: string): any[] {
    if (!filter.trim()) {
      return refs;
    }
    const sanitizedFilter = filter.toLowerCase();
    return refs.filter(ref =>
      ref.referenceDocumentsLibelle.toLowerCase().includes(sanitizedFilter)
    );
  }

  sortReferences(refs: any[], column: string, direction: string): any[] {
    return refs.sort((a, b) => {
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
    this.getAllRefs();
  }

  deleteRefById(id: number): void {
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
        this.refDocService.deleteRefDocument(id).subscribe(
          () => {
            console.log('Reference documents supprimé avec succès');
            this.getAllRefs();
          },
        );
      }
    });
  }
}
