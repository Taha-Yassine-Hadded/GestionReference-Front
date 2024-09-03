import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';
import { NatureClientService } from 'src/app/Services/NatureClient/nature-client.service';
import {SecteurActiviteService} from "../../../Services/SecteurActivite/secteur-activite.service";
import {PaysService} from "../../../Services/Pays/pays.service";

@Component({
  selector: 'app-put-client',
  templateUrl: './put-client.component.html',
  styleUrls: ['./put-client.component.css',
  '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutClientComponent implements OnInit {
  clientForm!: FormGroup;
  natureClients: any[] = [];
  submitButtonClicked: boolean = false;
  secteurs: any[] = [];
  pays: any[] = [];
  clientId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private natureClientService: NatureClientService,
    private secteurService: SecteurActiviteService,
    private paysService: PaysService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadNatureClients();
    this.loadPays();
    this.loadSecteurs();
    this.loadClientData();
  }

  initForm(): void {
    this.clientForm = this.formBuilder.group({
      clientPersonneContact1: ['', Validators.required],
      clientPersonneContact2: [''],
      clientPersonneContact3: [''],
      clientTelephone1: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      clientTelephone2: ['', Validators.pattern(/^\d+$/)],
      clientTelephone3: ['', Validators.pattern(/^\d+$/)],
      clientRaisonSocial: ['', Validators.required],
      clientRaisonSocialShort: ['', Validators.required],
      clientAdresse: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      natureClientId: ['', Validators.required],
      paysId: ['', Validators.required],
      secteurs: [[], Validators.required]
    });
  }

  loadClientData(): void {
    this.clientService.getClient(this.clientId).subscribe(
      (data) => {
        console.log(data);
        this.clientForm.patchValue({
          clientPersonneContact1: data.clientPersonneContact1,
          clientPersonneContact2: data.clientPersonneContact2,
          clientPersonneContact3: data.clientPersonneContact3,
          clientTelephone1: data.clientTelephone1,
          clientTelephone2: data.clientTelephone2,
          clientTelephone3: data.clientTelephone3,
          clientRaisonSocial: data.clientRaisonSocial,
          clientRaisonSocialShort: data.clientRaisonSocialShort,
          clientAdresse: data.clientAdresse,
          clientEmail: data.clientEmail,
          natureClientId: data.natureClientId,
          paysId: data.paysId,
        });
        this.clientForm.controls['secteurs'].setValue(data.secteurs.map((s:any) => s.id));
      },
      error => {
        console.log('Error loading client data:', error);
      }
    );
  }

  onSubmit(): void {
    this.submitButtonClicked = true;
    const formData = this.clientForm.value;
    console.log(formData);
    if (this.clientForm.valid && formData.natureClientId) {
      this.clientService.updateClient(this.clientId, formData)
        .subscribe(
          response => {
            this.clientForm.reset();
            console.log('Client updated successfully:', response);
            this.router.navigate(['/getClient']);
          },
          error => {
            console.log('Error updating client:', error);
          }
        );
    }
  }

  loadNatureClients(): void {
    this.natureClientService.getAllNatureClients().subscribe(
      (data: any[]) => {
        this.natureClients = data;
      },
      error => {
        console.log('Error loading nature clients:', error);
      }
    );
  }

  loadSecteurs(): void {
    this.secteurService.getAll().subscribe(
      (data: any[]) => {
        this.secteurs = data;
      },
      error => {
        console.log('Error loading secteurs :', error);
      }
    );
  }

  loadPays(): void {
    this.paysService.getAllPays().subscribe(
      (data: any[]) => {
        this.pays = data;
      },
      error => {
        console.log('Error loading pays:', error);
      }
    );
  }
}
