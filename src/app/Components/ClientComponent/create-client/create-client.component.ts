import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';
import { NatureClientService } from 'src/app/Services/NatureClient/nature-client.service';
import {SecteurActiviteService} from "../../../Services/SecteurActivite/secteur-activite.service";
import {PaysService} from "../../../Services/Pays/pays.service";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css',
  '../../../../assets/css/bootstrap.min.css'

]
})
export class CreateClientComponent implements OnInit{
  clientForm!: FormGroup;
  natureClients: any[] = [];
  submitButtonClicked: boolean = false;
  secteurs: any[] = [];
  pays: any[] = [];

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
    this.initForm();
    this.loadNatureClients();
    this.loadPays();
    this.loadSecteurs();
  }

  initForm(): void {
    this.clientForm = this.formBuilder.group({
      clientRaisonSocial: ['', Validators.required],
      clientRaisonSocialShort: ['', Validators.required],
      clientAdresse: ['', Validators.required],
      clientTelephone1: ['', [Validators.required, Validators.pattern(/^[+\d]+$/)]],
      clientTelephone2: ['', Validators.pattern(/^[+\d]+$/)],
      clientTelephone3: ['', Validators.pattern(/^[+\d]+$/)],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientPersonneContact1: ['', Validators.required],
      clientPersonneContact2: [''],
      clientPersonneContact3: [''],
      natureClientId: ['', Validators.required],
      paysId: ['', Validators.required],
      secteurs: [[], Validators.required] // For multiple select
    });
  }

  onSubmit(): void {
    this.submitButtonClicked = true;
    const formData = this.clientForm.value;
    console.log(formData);
    if (this.clientForm.valid && formData.natureClientId) {
      this.clientService.createClient(formData)
        .subscribe(
          response => {
            this.clientForm.reset();
            console.log('Client created successfully:', response);
            this.router.navigate(['/getClient']);
          },
          error => {
            console.log('Error creating client:', error);
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
