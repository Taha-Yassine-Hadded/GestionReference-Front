import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppelOffreService } from 'src/app/Services/AppelOffre/appel-offre.service';
import { RapportService } from 'src/app/Services/Rapport/rapport.service';


@Component({
  selector: 'app-appel-offre-details',
  templateUrl: './appel-offre-details.component.html',
  styleUrls: ['./appel-offre-details.component.css',
  '../../../../assets/css/bootstrap.min.css'
  ]
})
export class AppelOffreDetailsComponent implements OnInit {
  appelOffreId!: number;
  appelOffre: any; // Type à définir en fonction de votre modèle

  constructor(private route: ActivatedRoute, private appelOffreService: AppelOffreService , private rapportService: RapportService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.appelOffreId = parseInt(idParam, 10);
      } else {
        // Gérer le cas où le paramètre 'id' est null
      }
      

      this.loadAppelOffreDetails(this.appelOffreId);
    });
  }

  loadAppelOffreDetails(id: number): void {
    this.appelOffreService.getOneAppelOffre(id).subscribe(
      (data: any) => {
        this.appelOffre = data;
      },
      error => {
        console.error('Erreur lors du chargement des détails de l\'appel d\'offre :', error);
      }
    );
  }

  generatePdf(id: number): void {
    this.rapportService.generatePdf(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `appel_offre_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, error => {
      console.error('Error generating PDF:', error);
    });
  }
  getParticipationLabel(participation: number): string {
    return participation === 1 ? 'Oui' : 'Non';
  }
  getRetireLabel(retire: number): string {
    return retire === 1 ? 'Oui' : 'Non';
  }
  getEtatLabel(etat: number): string {
    return etat=== 1 ? 'Oui' : 'Non';
  }
  
}
