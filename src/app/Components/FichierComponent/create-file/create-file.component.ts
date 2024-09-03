import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetPreuveService } from 'src/app/Services/ProjetPreuve/projet-preuve.service';
import { UploadFileService } from 'src/app/Services/UploadFile/upload-file.service';

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class CreateFileComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';
  projetPreuves: any[] = [];
  selectedProjetPreuveId: number | null = null;

  constructor(
    private uploadService: UploadFileService,
    private projetPreuveService: ProjetPreuveService,
    private router: Router // Injection du service Router
  ) {}

  ngOnInit(): void {
    this.loadProjetPreuves();
  }

  loadProjetPreuves(): void {
    this.projetPreuveService.getAllProjetPreuves().subscribe(
      data => {
        this.projetPreuves = data;
      },
      error => {
        console.log('Error loading projetPreuves:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onUpload() {
    if (!this.selectedFile) {
      this.uploadMessage = 'No file selected!';
      return;
    }
    if (!this.selectedProjetPreuveId) {
      this.uploadMessage = 'No proof project ID selected!';
      return;
    }

    this.uploadService.uploadFile(this.selectedFile, this.selectedProjetPreuveId).subscribe({
      next: (event: any) => {
        if (event.status === 'progress') {
          this.uploadProgress = event.message;
        } else if (event instanceof HttpResponse) {
          this.uploadMessage = 'File successfully uploaded!';
          this.router.navigate(['/files']);
        }
      },
      
     
      error: (err: any) => {
        this.uploadMessage = 'File upload failed!';
        console.error(err);
      }
    });
  }
}