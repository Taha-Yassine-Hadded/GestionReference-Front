import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PosteService } from 'src/app/Services/Poste/poste.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-poste',
  templateUrl: './create-poste.component.html',
  styleUrls: ['./create-poste.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CreatePosteComponent {
  postes: any[] = [];
  posteForm!: FormGroup;
  formSubmitted: boolean = false; 

  constructor(private posteService: PosteService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { 
  }
ngOnInit(): void {
  this.initForm();
 
}

  initForm(): void {
    this.posteForm = this.formBuilder.group({
      posteNom: ['', Validators.required]
    });
  }
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.posteForm.valid) {
      const posteNom = this.posteForm.value.posteNom;

      this.posteService.createPoste(posteNom).subscribe(
        response => {
          console.log('Poste created successfully:', response);
          this.posteForm.reset();
          this.router.navigate(['/poste']);
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
    }  }
    
    
    
    