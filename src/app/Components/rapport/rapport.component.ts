// rapport.component.ts
import { Component } from '@angular/core';
import { RapportService } from 'src/app/Services/Rapport/rapport.service';


@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html'
})
export class RapportComponent {
  id!: number;
  

  
  constructor(private rapportService: RapportService) { }

  downloadPdf(): void {
    this.rapportService.downloadPdf(this.id).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `projet_${this.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}
