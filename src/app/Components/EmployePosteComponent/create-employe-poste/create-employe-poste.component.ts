import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PosteService} from "../../../Services/Poste/poste.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {EmployePosteService} from "../../../Services/EmployePoste/employe-poste.service";

@Component({
  selector: 'app-create-employe-poste',
  templateUrl: './create-employe-poste.component.html',
  styleUrls: ['./create-employe-poste.component.css',
    '../../../../assets/css/bootstrap.min.css']
})
export class CreateEmployePosteComponent {
  postes: any[] = [];
  posteForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(private posteService: EmployePosteService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.initForm();

  }

  initForm(): void {
    this.posteForm = this.formBuilder.group({
      employePosteLibelle: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.posteForm.valid) {
      const employePosteLibelle = this.posteForm.value.employePosteLibelle;
      console.log(employePosteLibelle)

      this.posteService.create({employePosteLibelle}).subscribe(
        response => {
          console.log('Poste created successfully:', response);
          this.posteForm.reset();
          this.router.navigate(['/employePoste']);
        },
        error => {
          if (error.status === 409) {
            Swal.fire({
              title: "Ce poste existe déjà.",
              icon: "warning",

              confirmButtonColor: "#3085d6",

              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // Si l'utilisateur confirme, vous pouvez ajouter une logique supplémentaire ici
                console.log('L\'utilisateur a confirmé');
              }
            });
          } else {
            console.error('Erreur lors de la création du type d\'appel d\'offre :', error);
            // Ajoutez ici la logique pour gérer les erreurs autres que le conflit de duplication
          }
        }
      );
    }
  }
}
