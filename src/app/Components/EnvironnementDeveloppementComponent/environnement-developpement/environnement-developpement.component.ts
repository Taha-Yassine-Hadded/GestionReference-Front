import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import Swal from "sweetalert2";
import { EnvironnementDeveloppementService } from "../../../Services/EnvironnementDeveloppement/environnement-developpement.service";

@Component({
  selector: 'app-environnement-developpement',
  templateUrl: './environnement-developpement.component.html',
  styleUrls: ['./environnement-developpement.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class EnvironnementDeveloppementComponent implements OnInit {

  envList$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  libelleFilter: string = '';
  filterResult: any[] = [];
  sortColumn: string = 'environnementDeveloppementLibelle';
  sortDirection: string = 'asc';

  constructor(private envDevService: EnvironnementDeveloppementService) { }

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
    this.envList$ = this.envDevService.getAll().pipe(
      map(env => {
        this.filterResult = this.searchByLibelle(env, this.libelleFilter);
        this.collectionSize = this.filterResult.length;
        this.filterResult = this.sortEnvironments(this.filterResult, this.sortColumn, this.sortDirection);
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

  searchByLibelle(envList: any[], filter: string): any[] {
    if (!filter.trim()) {
      return envList;
    }
    const sanitizedFilter = filter.toLowerCase();
    return envList.filter(env =>
      env.environnementDeveloppementLibelle.toLowerCase().includes(sanitizedFilter) ||
      env.environnementDeveloppementDescription.toLowerCase().includes(sanitizedFilter)
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
        this.envDevService.delete(id).subscribe(
          () => {
            console.log('Environnement de développement supprimé avec succès');
            this.getAll();
          },
        );
      }
    });
  }

  sortEnvironments(envList: any[], column: string, direction: string): any[] {
    return envList.sort((a, b) => {
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
