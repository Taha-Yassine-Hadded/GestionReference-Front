import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UploadFileService } from 'src/app/Services/UploadFile/upload-file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class FichierComponent implements OnInit {
  uploads$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  nomFilter: string = '';
  filteredUploads: any[] = [];

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.getAllUploads();
  }

  getAllUploads(): void {
    this.uploads$ = this.uploadService.getAllUploads().pipe(
      map(uploads => {
        this.filteredUploads = this.searchByName(uploads, this.nomFilter);
        this.collectionSize = this.filteredUploads.length;
        return this.filteredUploads.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    );
  }

  onPageChange(): void {
    this.getAllUploads();
  }

  refreshUploads(): void {
    this.getAllUploads();
  }

  filterByNom(): void {
    this.getAllUploads();
  }

  searchByName(uploads: any[], filter: string): any[] {
    if (!filter.trim()) {
      return uploads;
    }
    const sanitizedFilter = filter.toLowerCase();
    return uploads.filter(upload =>
      // Replace 'nom' with the actual property you want to filter by
      upload.projetPreuveId.toLowerCase().includes(sanitizedFilter)
    );
  }
  deleteUpload(id: number): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "Êtes-vous sûr(e) ?",
      text: "Vous ne pourrez pas revenir en arrière !",    
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Non, annuler",      
      reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire({
              title: "Supprimé !",
              text: "Votre donnée a été supprimé.",
              icon: "success"
            });
            this.uploadService.deleteUpload(id).subscribe(
              () => {
                console.log('Fichier supprimé avec succès');
                this.getAllUploads(); // Refresh the list after deletion
              },)
      } 
  });
}
     
}

 
 