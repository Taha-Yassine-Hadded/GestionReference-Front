import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmployeEducationService } from 'src/app/Services/EmployeEducation/employe-education.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employe-education',
  templateUrl: './employe-education.component.html',
  styleUrls: [
    './employe-education.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class EmployeEducationComponent implements OnInit {
  educations$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  id!: number;
  searchText: string = '';
  filteredEducations: any[] = [];

  constructor(
    private employeEducationService: EmployeEducationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllEducations();
    this.route.params.subscribe((params) => {
      this.id = params['id']; // Get the ID from the route
    });
  }

  getAllEducations(): void {
    this.educations$ = this.employeEducationService.getAllEmployeEducations().pipe(
      map((educations) => {
        this.filteredEducations = this.searchByName(educations, this.searchText);
        this.collectionSize = this.filteredEducations.length;
        return this.filteredEducations.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      }),
      catchError((error) => {
        console.error('Error occurred while fetching educations: ', error);
        return of([]); // Return empty array in case of error
      })
    );
  }

  onPageChange(): void {
    this.getAllEducations();
  }

  refreshEducations(): void {
    this.getAllEducations();
  }

  onSearch(): void {
    // Reload educations when search is performed
    this.page = 1; // Reset page number to first page
    this.getAllEducations();
  }

  searchByName(educations: any[], filter: string): any[] {
    if (!filter.trim()) {
      return educations;
    }
    const sanitizedFilter = filter.toLowerCase();
    return educations.filter((education) =>
      // Replace 'name' with the actual property you want to filter by
      education.employe.toLowerCase().includes(sanitizedFilter)
    );
  }

  deleteEducation(id: number): void {
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
            this.employeEducationService.deleteEmployeEducation(id).subscribe(
              () => {
                console.log('Education deleted successfully');
                this.getAllEducations(); // Refresh the list after deletion
              },)
      } 
  });
}
     
}

   
