import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangueService } from 'src/app/Services/Langue/langue.service';

@Component({
  selector: 'app-put-langue',
  templateUrl: './put-langue.component.html',
  styleUrls: ['./put-langue.component.css',
    '../../../../assets/css/bootstrap.min.css'
  ]
})
export class PutLangueComponent implements OnInit {
  editLangue: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute, private router: Router, private langueService: LangueService, private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadLangue(this.id);
    });
  }

  loadLangue(id: number): void {
    this.langueService.getLangueById(id).subscribe(
      (data: any) => {
        this.editLangue = data;
      },
      error => {
        console.error('Une erreur est survenue lors de la récupération de l\'appel d\'offre type:', error);
      }
    );
  }

  updateLangue(id: number): void {
    if (!this.editLangue.langueNom) {
      return; // Stop form submission if the field is empty
    }
    this.langueService.updateLangue(id, this.editLangue).subscribe(() => {
      this.editLangue = {}; // Reset the editLangue property after update
      this.router.navigate(['/getLangue']);
    });
  }
}
