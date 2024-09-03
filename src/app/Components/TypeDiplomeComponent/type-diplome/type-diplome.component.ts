import { Component } from '@angular/core';
import {map, Observable} from "rxjs";
import {RoleService} from "../../../Services/Role/role.service";
import Swal from "sweetalert2";
import {TypeDiplomeService} from "../../../Services/TypeDiplome/type-diplome.service";

@Component({
  selector: 'app-type-diplome',
  templateUrl: './type-diplome.component.html',
  styleUrls: ['./type-diplome.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class TypeDiplomeComponent {
  typeList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'typeDiplomeLibelle';
  sortDirection: string = 'asc';

  constructor(private typeDiplomeService: TypeDiplomeService) { }

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
    this.typeList$ = this.typeDiplomeService.getAll().pipe(
      map(types => {
        this.filterResult = this.searchByLibelle(types, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortRoles(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(typesList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return typesList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return typesList.filter(type =>
      type.typeDiplomeLibelle.toLowerCase().includes(sanitizedFilter)
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
        this.typeDiplomeService.delete(id).subscribe(
          () => {
            console.log('Type diplome supprimé avec succès');
            this.getAll();
          }
        );
      }
    });
  }

  sortRoles(roles: any[], column: string, direction: string): any[] {
    return roles.sort((a, b) => {
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
