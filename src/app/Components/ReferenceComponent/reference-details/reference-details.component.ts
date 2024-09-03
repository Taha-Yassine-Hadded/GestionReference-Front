import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReferenceService } from 'src/app/Services/Reference/reference.service';

@Component({
  selector: 'app-reference-details',
  templateUrl: './reference-details.component.html',
  styleUrls: ['./reference-details.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class ReferenceDetailsComponent implements OnInit {
  referenceId!: number;
  reference: any; // Define the type according to your model

  constructor(private route: ActivatedRoute, private referenceService: ReferenceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.referenceId = parseInt(idParam, 10);
        this.loadReferenceDetails(this.referenceId);
      } else {
        // Handle the case where the 'id' parameter is null
      }
    });
  }

  loadReferenceDetails(id: number): void {
    this.referenceService.getReferenceById(id).subscribe(
      (data: any) => {
        this.reference = data;
      },
      error => {
        console.error('Error loading reference details:', error);
      }
    );
  }
}