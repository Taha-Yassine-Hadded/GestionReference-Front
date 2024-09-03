import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReferenceService } from 'src/app/Services/Reference/reference.service';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { RapportService } from 'src/app/Services/Rapport/rapport.service';
import { CategorieService } from 'src/app/Services/Categorie/categorie.service';
import { PaysService } from 'src/app/Services/Pays/pays.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {BailleurFondService} from "../../../Services/BailleurFond/bailleur-fond.service";
import {FilterService} from "../../../Services/Filter/filter.service";

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css', '../../../../assets/css/bootstrap.min.css']
})
export class ReferenceComponent implements OnInit {
  form: FormGroup;
  references$: Observable<any[]> = new Observable<any[]>();
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  searchTerm: string = '';
  filteredReferences: any[] = [];
  categories: any[] = [];
  isAdmin: boolean = false;
  selectedCategoryId: number | null = null;
  selectedBailleurFonds: any[] = [];
  bailleurFonds: any[] = [];
  selectedPays: any[] = [];
  paysList: any[] = [];
  minAnneeAchevement: number | null = null;
  maxAnneeAchevement: number | null = null;
  anneeDuOptions: number[] = [];
  anneeAuOptions: number[] = [];
  referenceIds:number[] = [];
  sortColumn: string = 'referenceRef'; // Default sort column
  sortDirection: 'asc' | 'desc' = 'asc'; // Default sort direction

  constructor(
    private fb: FormBuilder,
    private referenceService: ReferenceService,
    private categorieService: CategorieService,
    private authService: LoginService,
    private rapportService: RapportService,
    private bailleurFondService: BailleurFondService,
    private paysService: PaysService,
    private filterService: FilterService

  ) {
    this.form = this.fb.group({
      anneeDu: [null],
      anneeAu: [null],
      paysIds: [],
      budget: [null, ],
      reception: [null],
      bailleurFondIds: []
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      anneeDu: [this.filterService.getFilter('anneeDu')],
      anneeAu: [this.filterService.getFilter('anneeAu')],
      paysIds: [this.filterService.getFilter('paysIds')],
      budget: [this.filterService.getFilter('budget')],
      reception: [this.filterService.getFilter('reception')],
      bailleurFondIds: [this.filterService.getFilter('bailleurFondIds')]
    });

    this.selectedPays = this.filterService.getFilter('selectedPays') || [];
    this.selectedBailleurFonds = this.filterService.getFilter('selectedBailleurFonds') || [];
    this.searchTerm = this.filterService.getFilter('searchTerm') || '';

    this.loadCategories();

    this.updateAdminStatus();
    this.loadBailleurFonds();
    this.loadPays();

    this.filterReferences();

    console.log('the selected categorie is', this.selectedCategoryId)

  }

  sortReferences(column: string): void {
    this.sortDirection = (this.sortColumn === column && this.sortDirection === 'asc') ? 'desc' : 'asc';
    this.sortColumn = column;
    this.filterReferences();
  }


  loadPays(): void {
    this.paysService.getAllPays().subscribe(
      (data: any[]) => {
        this.paysList = data;
      },
      error => {
        console.error('Error loading pays:', error);
      }
    );
  }

  loadBailleurFonds(): void {
    this.bailleurFondService.getAll().subscribe(
      (data: any[]) => {
        this.bailleurFonds = data;
      },
      error => {
        console.error('Error loading bailleurFonds:', error);
      }
    );
  }
  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
        this.selectedCategoryId = this.filterService.getCategory();
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  updateAdminStatus() {
    this.isAdmin = this.authService.isAdmin();
  }

  onCategorySelect(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.filterService.setCategory(categoryId);
    this.filterReferences();
    console.log(this.filterService.getCategory());
  }


  applyFilters(references: any[], searchTerm: string): any[] {
    if (!searchTerm.trim()) {
      return references;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return references.filter(reference =>
      reference.referenceRef.toLowerCase().includes(lowerCaseSearchTerm) ||
      reference.referenceTitre.toLowerCase().includes(lowerCaseSearchTerm) ||
      reference.clientId.toLowerCase().includes(lowerCaseSearchTerm) ||
      reference.referenceDateDemarrage.toLowerCase().includes(lowerCaseSearchTerm) ||
      reference.referenceDateAchevement.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }

  populateYearOptions(): void {
    if (this.minAnneeAchevement !== null && this.maxAnneeAchevement !== null) {
      this.anneeDuOptions = Array.from({ length: this.maxAnneeAchevement - this.minAnneeAchevement + 1 }, (_, i) => this.minAnneeAchevement! + i);
      this.anneeAuOptions = [...this.anneeDuOptions];
    }
  }


  filterReferences(): void {
    const filterValues = this.form.value;
    this.filterService.setFilter('anneeDu', filterValues.anneeDu);
    this.filterService.setFilter('anneeAu', filterValues.anneeAu);
    this.filterService.setFilter('paysIds', filterValues.paysIds);
    this.filterService.setFilter('budget', filterValues.budget);
    this.filterService.setFilter('reception', filterValues.reception);
    this.filterService.setFilter('bailleurFondIds', filterValues.bailleurFondIds);
    this.filterService.setFilter('selectedPays', this.selectedPays);
    this.filterService.setFilter('selectedBailleurFonds', this.selectedBailleurFonds);
    this.filterService.setFilter('searchTerm', this.searchTerm);

    this.referenceService.getAllReferences().pipe(
      map(references => {
        const achevementYears = references
          .map(ref => ref.referenceAnneeAchevement)
          .filter(year => year !== null);

        this.minAnneeAchevement = achevementYears.length > 0 ? Math.min(...achevementYears) : null;
        this.maxAnneeAchevement = achevementYears.length > 0 ? Math.max(...achevementYears) : null;

        this.populateYearOptions();
        // Step 1: Filter by selected category if one is selected
        if (this.selectedCategoryId !== null) {
          references = references.filter(reference => reference.categorieId === this.selectedCategoryId)
        }

        if (this.selectedPays.length > 0) {
          references = references.filter(reference =>this.selectedPays.includes(reference.paysId)
          );
        }

        if (this.selectedBailleurFonds.length > 0) {
          references = references.filter(reference => {
            return reference.bailleursFonds.some((bailleurFond: { bailleurFondId: number }) =>
              this.selectedBailleurFonds.includes(bailleurFond.bailleurFondId)
            );
          });
        }
        if (this.form.value.anneeDu !== null) {
          references = references.filter(reference =>
            reference.referenceAnneeAchevement >= this.form.value.anneeDu
          );
        }

        if (this.form.value.anneeAu !== null) {
          references = references.filter(reference =>
            reference.referenceAnneeAchevement <= this.form.value.anneeAu
          );
        }

        if (!Number.isNaN(parseInt(this.form.value.budget, 10))) {
          references = references.filter(reference =>
            reference.referenceBudget >= this.form.value.budget
          );
        }
        if (this.form.value.reception !== null) {
          const today = new Date();
          if (this.form.value.reception === 'oui') {
            references = references.filter(reference => {
              const dateReception = new Date(reference.referenceDateReceptionDefinitive);
              return  reference.referenceDateReceptionDefinitive !== null && dateReception < today;
            });
          } else if (this.form.value.reception === 'non') {
            references = references.filter(reference => {
              const dateReception = new Date(reference.referenceDateReceptionDefinitive);
              return reference.referenceDateReceptionDefinitive=== null || dateReception >= today;
            });
          }
        }

        // Step 2: Apply search term filtering
        this.filteredReferences = this.applyFilters(references, this.searchTerm);


        this.filteredReferences.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];

          let comparison = 0;
          if (aValue > bValue) {
            comparison = 1;
          } else if (aValue < bValue) {
            comparison = -1;
          }

          return this.sortDirection === 'asc' ? comparison : -comparison;
        });


        this.collectionSize = this.filteredReferences.length;

        // Step 3: Paginate the filtered references
        return this.filteredReferences.slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      })
    ).subscribe(filteredReferences => {
      this.references$ = of(filteredReferences);
    });
  }

  onSearchChange() {
    this.filterService.setFilter('searchTerm', this.searchTerm);
    this.filterReferences();
  }

  searchByNom(references: any[], filter: string): any[] {
    if (!filter.trim()) {
      return references;
    }
    const sanitizedFilter = filter.toLowerCase();
    return references.filter(reference =>
      reference.referenceLibelle.toLowerCase().includes(sanitizedFilter)
    );
  }

  onPageChange(): void {
    this.filterReferences();
  }

  refreshReferences(): void {
    this.filterReferences();
  }

  getReferenceIds(): void {
    this.references$.subscribe(references => {
      this.referenceIds = references.map(ref => ref.referenceID);
    });
  }
  generatePdfForAllReferences(): void {
    this.getReferenceIds();
    if (this.referenceIds.length) {
      this.rapportService.generatePdfs(this.referenceIds).subscribe(response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'references.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    } else {
      alert('Aucune référence à générer.');
    }
  }

  generateWordForAllReferences(): void {
    this.getReferenceIds();
    console.log(this.referenceIds)
    if (this.referenceIds.length) {
      this.rapportService.generateWordReports(this.referenceIds).subscribe(response => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'all_references_report.docx';
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Erreur lors de la génération du rapport Word', error);
      });
    } else {
      alert('Aucune référence à générer.');
    }
  }


  generateWord(referenceId: number) {
    this.rapportService.downloadWord(referenceId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `reference_${referenceId}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed', error);
    });
  }

  generatePdf(id: number) {
    this.rapportService.downloadPdf(id).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `reference_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed', error);
    });
  }


  deleteReference(id: number): void {
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
          text: "Votre donnée a été supprimée.",
          icon: "success"
        });
        this.referenceService.deleteReference(id).subscribe(
          () => {
            console.log('Reference supprimée avec succès');
            this.filterReferences();
          }
        );
      }
    });
  }

}
