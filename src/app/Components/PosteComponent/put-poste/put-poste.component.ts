import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteService } from 'src/app/Services/Poste/poste.service';

@Component({
  selector: 'app-put-poste',
  templateUrl: './put-poste.component.html',
  styleUrls: ['./put-poste.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class PutPosteComponent implements OnInit {
  id!: number;
  posteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private posteService: PosteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.posteForm = this.formBuilder.group({
      posteNom: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadPoste(this.id);
    });
  }

  loadPoste(id: number): void {
    this.posteService.getPoste(id).subscribe(
      (data: any) => {
        this.posteForm.patchValue(data);
      },
      error => {
        console.log('Error loading poste:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.posteForm.valid) {
      const posteNom = this.posteForm.value.posteNom;

      this.posteService.updatePoste(this.id, posteNom).subscribe(
        response => {
          console.log('Poste updated successfully:', response);
          this.router.navigate(['/poste']); // Navigate back to postes list after update
        },
        error => {
          console.log('Error updating poste:', error);
        }
      );
    }
  }
}
