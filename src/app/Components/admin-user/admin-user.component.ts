import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SignUpService } from 'src/app/Services/SignUpService/sign-up.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css', '../../../assets/css/bootstrap.min.css']
})
export class AdminUserComponent implements OnInit {
  users$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredUsers: any[] = [];
  sortColumn: string = 'username'; // Default sort column
  sortDirection: string = 'asc'; // Default sort direction

  constructor(private adminUserService: SignUpService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.adminUserService.getAllUsers().pipe(
      map(users => {
        this.filteredUsers = this.searchByUsername(users, this.nomFilter);
        this.collectionSize = this.filteredUsers.length;
        this.filteredUsers = this.sortUsers(this.filteredUsers, this.sortColumn, this.sortDirection);
        return this.filteredUsers.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByNom(): void {
    this.loadUsers();
  }

  searchByUsername(users: any[], filter: string): any[] {
    if (!filter.trim()) {
      return users;
    }
    const sanitizedFilter = filter.toLowerCase();
    return users.filter(user =>
      user.username.toLowerCase().includes(sanitizedFilter) ||
      user.email.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteUser(userId: number): void {
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
        this.adminUserService.deleteUser(userId).subscribe(
          () => {
            this.loadUsers();
          },
          error => {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
          }
        );
      }
    });
  }

  onPageChange(): void {
    this.loadUsers();
  }

  refreshCountries(): void {
    this.loadUsers();
  }

  sortUsers(users: any[], column: string, direction: string): any[] {
    return users.sort((a, b) => {
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
    this.loadUsers();
  }
}
