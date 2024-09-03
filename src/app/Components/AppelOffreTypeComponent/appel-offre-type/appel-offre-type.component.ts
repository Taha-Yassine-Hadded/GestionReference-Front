import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppelOffreTypeService } from 'src/app/Services/AppelOffreType/appel-offre-type.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appel-offre-type',
  templateUrl: './appel-offre-type.component.html',
  styleUrls: ['./appel-offre-type.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class AppelOffreTypeComponent implements OnInit {
  appelOffreTypes$: Observable<any[]> = new Observable<any[]>();
  id!: number;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredAppelOffreTypes: any[] = [];

  constructor(
    private appelOffreTypeService: AppelOffreTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAppelOffreTypes();
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the ID from the route
    });
  }

  getAllAppelOffreTypes(): void {
    this.appelOffreTypes$ = this.appelOffreTypeService.getAppelOffreTypes().pipe(
      map(appelOffreTypes => {
        this.filteredAppelOffreTypes = this.searchByNom(appelOffreTypes, this.nomFilter);
        this.collectionSize = this.filteredAppelOffreTypes.length;
        return this.filteredAppelOffreTypes.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  filterByNom(): void {
    this.getAllAppelOffreTypes();
  }

  searchByNom(appelOffreTypes: any[], filter: string): any[] {
    if (!filter.trim()) {
      return appelOffreTypes;
    }
    const sanitizedFilter = filter.toLowerCase();
    return appelOffreTypes.filter(type =>
      type.appelOffreType.toLowerCase().includes(sanitizedFilter)
    );
  }

  onPageChange(): void {
    this.getAllAppelOffreTypes();
  }

  refreshCountries(): void {
    this.getAllAppelOffreTypes();
  }

  deleteAppelOffreType(id: number): void {
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
          this.appelOffreTypeService.deleteAppelOffreType(id).subscribe(
            () => {
              console.log('Appel d\'offre type supprimé avec succès');
              this.getAllAppelOffreTypes();
            },
          );
      } 
  });
}
     
}
