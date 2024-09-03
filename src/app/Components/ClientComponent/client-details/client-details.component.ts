import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css','../../../../assets/css/bootstrap.min.css']
})
export class ClientDetailsComponent implements OnInit {
  clientId!: number;
  client: any; // Type to be defined according to your model

  constructor(private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.clientId = parseInt(idParam, 10);
        this.loadClientDetails(this.clientId);
      } else {
        // Handle the case where the 'id' parameter is null
      }
    });
  }

  loadClientDetails(id: number): void {
    this.clientService.getClientInfo(id).subscribe(
      (data: any) => {
        console.log(data);
        this.client = data;
      },
      error => {
        console.error('Error loading client details:', error);
      }
    );
  }
}
