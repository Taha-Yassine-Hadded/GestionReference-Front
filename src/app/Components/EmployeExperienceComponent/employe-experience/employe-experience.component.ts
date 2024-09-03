import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeExperienceService } from 'src/app/Services/EmployeExperience/employe-experience.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employe-experience',
  templateUrl: './employe-experience.component.html',
  styleUrls: [
    './employe-experience.component.css',
    '../../../../assets/css/bootstrap.min.css'
  ]
})
export class EmployeExperienceComponent {
  experiences$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  id!: number;
  searchText: string = '';
  filteredExperiences: any[] = [];

  constructor(
    private employeExperienceService: EmployeExperienceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllExperiences();
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the ID from the route
    });
  }

  getAllExperiences(): void {
    this.experiences$ = this.employeExperienceService.getAllEmployeExperiences().pipe(
      map(experiences => {
        this.filteredExperiences = this.searchByName(experiences, this.searchText);
        this.collectionSize = this.filteredExperiences.length;
        return this.filteredExperiences.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      }),
      catchError(error => {
        console.error('Error occurred while fetching experiences:', error);
        return of([]); // Return empty array in case of error
      })
    );
  }

  onPageChange(): void {
    this.getAllExperiences();
  }

  refreshExperiences(): void {
    this.getAllExperiences();
  }

  onSearch(): void {
    // Reload experiences when search is performed
    this.page = 1; // Reset page number to first page
    this.getAllExperiences();
  }

  searchByName(experiences: any[], filter: string): any[] {
    if (!filter.trim()) {
      return experiences;
    }
    const sanitizedFilter = filter.toLowerCase();
    return experiences.filter(experience =>
      // Replace 'name' with the actual property you want to filter by
      experience.employe.toLowerCase().includes(sanitizedFilter)
    );
  }
  deleteExperience(id: number): void {
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
            this.employeExperienceService.deleteEmployeExperience(id).subscribe(
              () => {
                console.log('Experience deleted successfully');
                this.getAllExperiences(); // Refresh the list after deletion
              },)
      } 
  });
}
     
}

 