import { Component } from '@angular/core';
import {map, Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PosteService} from "../../../Services/Poste/poste.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {EmployePosteService} from "../../../Services/EmployePoste/employe-poste.service";

@Component({
  selector: 'app-employe-poste',
  templateUrl: './employe-poste.component.html',
  styleUrls: ['./employe-poste.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class EmployePosteComponent {
  postes$: Observable<any[]> = new Observable<any[]>();
  posteForm: FormGroup;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  sortColumn: string = 'posteNom'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction

  constructor(
    private posteService: EmployePosteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.posteForm = this.formBuilder.group({
      posteNom: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPostes();
  }

  onPageChange(): void {
    this.loadPostes();
  }

  refreshPostes() {
    this.loadPostes();
  }

  loadPostes(): void {
    this.postes$ = this.posteService.getAll().pipe(
      map(postes => {
        this.collectionSize = postes.length;
        let filteredPostes = postes.filter(poste =>
          poste.employePosteLibelle.toLowerCase().includes(this.nomFilter.toLowerCase())
        );
        filteredPostes = this.sortPostes(filteredPostes, this.sortColumn, this.sortDirection);
        return filteredPostes.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByNom(): void {
    this.page = 1; // Reset page number when filter changes
    this.loadPostes();
  }

  deletePoste(id: number): void {
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
        this.posteService.delete(id).subscribe(
          () => {
            this.loadPostes();
          }
        );
      }
    });
  }

  sortPostes(postes: any[], column: string, direction: string): any[] {
    return postes.sort((a, b) => {
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
    this.loadPostes();
  }
}
