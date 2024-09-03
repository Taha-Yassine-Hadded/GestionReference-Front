import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class ClientComponent implements OnInit {
  Clients$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  personneContactFilter: string = '';
  filteredClients: any[] = [];
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  onPageChange(): void {
    this.getAllClients();
  }

  refreshClients(): void {
    this.getAllClients();
  }

  getAllClients(): void {
    this.Clients$ = this.clientService.getAllClients().pipe(
      map(clients => {
        this.filteredClients = this.searchByPersonneContact(clients, this.personneContactFilter);
        this.collectionSize = this.filteredClients.length;
        if (this.sortColumn) {
          this.filteredClients.sort((a, b) => this.compare(a, b, this.sortColumn, this.sortDirection));
        }
        return this.filteredClients.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByPersonneContact(): void {
    this.getAllClients();
  }

  searchByPersonneContact(clients: any[], filter: string): any[] {
    if (!filter.trim()) {
      return clients;
    }
    const sanitizedFilter = filter.toLowerCase();
    return clients.filter(client =>
      client.clientRaisonSociale.toLowerCase().includes(sanitizedFilter) ||
      client.natureClient.toLowerCase().includes(sanitizedFilter) ||
      client.paysClient.toLowerCase().includes(sanitizedFilter) ||
      client.clientAdresse.toLowerCase().includes(sanitizedFilter)

    );
  }

  deleteClient(id: number): void {
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
        this.clientService.deleteClient(id).subscribe(() => {
          console.log('Client supprimé avec succès');
          this.getAllClients();
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
    this.getAllClients();
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
