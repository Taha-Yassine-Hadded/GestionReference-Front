import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PosteService} from "../../../Services/Poste/poste.service";
import {EmployePosteService} from "../../../Services/EmployePoste/employe-poste.service";

@Component({
  selector: 'app-update-employe-poste',
  templateUrl: './update-employe-poste.component.html',
  styleUrls: ['./update-employe-poste.component.css', '../../../../assets/css/bootstrap.min.css']

})
export class UpdateEmployePosteComponent {
  id!: number;
  posteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private posteService: EmployePosteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.posteForm = this.formBuilder.group({
      employePosteLibelle: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadPoste(this.id);
    });
  }

  loadPoste(id: number): void {
    this.posteService.getById(id).subscribe(
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
      const employePosteLibelle = this.posteForm.value.employePosteLibelle;

      this.posteService.update(this.id, {employePosteLibelle}).subscribe(
        response => {
          console.log('Poste updated successfully:', response);
          this.router.navigate(['/employePoste']); // Navigate back to postes list after update
        },
        error => {
          console.log('Error updating poste:', error);
        }
      );
    }
  }
}
