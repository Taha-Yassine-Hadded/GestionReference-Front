import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { EmployeService } from 'src/app/Services/Employe/employe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class EmployeComponent implements OnInit {
  employes$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredEmployes: any[] = [];
  sortColumn: string = 'employeNom';
  sortDirection: string = 'asc';

  constructor(private employeService: EmployeService) { }

  ngOnInit(): void {
    this.getAllEmployes();
  }

  getAllEmployes(): void {
    this.employes$ = this.employeService.getAll().pipe(
      map(employes => {
        this.filteredEmployes = this.searchByName(employes, this.nomFilter);
        this.collectionSize = this.filteredEmployes.length;
        this.filteredEmployes = this.sortEmployes(this.filteredEmployes, this.sortColumn, this.sortDirection);
        return this.filteredEmployes.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllEmployes();
  }

  refreshEmployes(): void {
    this.getAllEmployes();
  }

  filterByNom(): void {
    this.getAllEmployes();
  }

  searchByName(employes: any[], filter: string): any[] {
    if (!filter.trim()) {
      return employes;
    }
    const sanitizedFilter = filter.toLowerCase();
    return employes.filter(employe =>
      employe.employeNom.toLowerCase().includes(sanitizedFilter) ||
      employe.employePrenom.toLowerCase().includes(sanitizedFilter) ||
      employe.employePoste.employePosteLibelle.toLowerCase().includes(sanitizedFilter) ||
      employe.employeAdresse.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteEmploye(id: number): void {
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
        this.employeService.delete(id).subscribe(
          () => {
            this.getAllEmployes();
            console.log('Employé supprimé avec succès');
          },
          (error) => {
            console.log('Une erreur est survenue lors de la suppression de l\'employé :', error);
          }
        );
      }
    });
  }

  sortEmployes(employes: any[], column: string, direction: string): any[] {
    return employes.sort((a, b) => {
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
    this.getAllEmployes();
  }
}
