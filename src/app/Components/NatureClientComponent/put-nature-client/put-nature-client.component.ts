import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NatureClientService } from 'src/app/Services/NatureClient/nature-client.service';

@Component({
  selector: 'app-put-nature-client',
  templateUrl: './put-nature-client.component.html',
  styleUrls: ['./put-nature-client.component.css',
    '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutNatureClientComponent implements OnInit {

  formSubmitted: boolean = false;
  natureForm: any;
  id!: number;

  constructor(
    private route: ActivatedRoute, private router: Router, private natureClientService: NatureClientService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.natureForm = this.fb.group({
      natureClientLibelle: ['', Validators.required],
      natureClientDescription: ['']
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadNature(this.id);
    });
  }

  loadNature(id: number): void {
    this.natureClientService.getNatureClientById(id).subscribe(
      (data: any) => {
        this.natureForm.patchValue(data);
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération de la nature du client:', error);
      }
    );
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.natureForm.valid) {
      this.natureClientService.updateNatureClient(this.id, this.natureForm.value).subscribe(() => {
        this.router.navigate(['/getNature']);
      });
    }
  }
}
