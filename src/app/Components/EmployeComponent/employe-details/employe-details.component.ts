import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from 'src/app/Services/Employe/employe.service';

@Component({
  selector: 'app-employe-details',
  templateUrl: './employe-details.component.html',
  styleUrls: ['./employe-details.component.css','../../../../assets/css/bootstrap.min.css']
})
export class EmployeDetailsComponent {
  employeId!: number;
  employe: any; // Type to be defined according to your model

  constructor(private route: ActivatedRoute, private employeService: EmployeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.employeId = parseInt(idParam, 10);
        this.loadEmployeDetails(this.employeId);
      } else {
        // Handle the case where the 'id' parameter is null
      }
    });
  }

  loadEmployeDetails(id: number): void {
    this.employeService.getDetails(id).subscribe(
      (data: any) => {
        this.employe = data;
      },
      error => {
        console.error('Error loading employe details:', error);
      }
    );
  }
}
