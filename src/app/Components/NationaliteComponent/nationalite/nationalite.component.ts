import { Component, OnInit } from '@angular/core';
import { NationaliteService } from 'src/app/Services/Nationalite/nationalite.service';
import { Observable, map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nationalite',
  templateUrl: './nationalite.component.html',
  styleUrls: ['./nationalite.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class NationaliteComponent implements OnInit {
  nationalites$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredNationalites: any[] = [];

  constructor(private nationaliteService: NationaliteService) { }

  ngOnInit(): void {
    this.getAllNationalites();
  }

  onPageChange(): void {
    this.getAllNationalites();
  }

  refreshNationalites() {
    this.getAllNationalites();
  }

  getAllNationalites(): void {
    this.nationalites$ = this.nationaliteService.getAllNationalites().pipe(
      map(nationalites => {
        this.filteredNationalites = this.searchByNom(nationalites, this.nomFilter);
        this.collectionSize = this.filteredNationalites.length;
        return this.filteredNationalites.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByNom(): void {
    this.getAllNationalites();
  }

  searchByNom(nationalites: any[], filter: string): any[] {
    if (!filter.trim()) {
      return nationalites;
    }
    const sanitizedFilter = filter.toLowerCase();
    return nationalites.filter(nationalite =>
      nationalite.nationaliteLibelle.toLowerCase().includes(sanitizedFilter)
    );
  }
  deleteNationaliteById(id: number): void {
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
            this.nationaliteService.deleteNationalite(id).subscribe(
              () => {
                console.log('Nationalité supprimée avec succès');
                this.getAllNationalites();
              },)
      } 
  });
}
     
}

