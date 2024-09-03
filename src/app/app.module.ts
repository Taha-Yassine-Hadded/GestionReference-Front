

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/AuthentificationComponent/login/login.component';
import { SignupComponent } from './Components/AuthentificationComponent/signup/signup.component';
import { RecoverpwComponent } from './Components/AuthentificationComponent/recoverpw/recoverpw.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PickListModule } from 'primeng/picklist';
import { MatCheckboxModule } from '@angular/material/checkbox';



import { AppelOffreTypeComponent } from './Components/AppelOffreTypeComponent/appel-offre-type/appel-offre-type.component';
import { CreateAppelOffreTypeComponent } from './Components/AppelOffreTypeComponent/create-appel-offre-type/create-appel-offre-type.component';

import { CategorieComponent } from './Components/CategorieComponent/categorie/categorie.component';
import { CreateCategorieComponent } from './Components/CategorieComponent/create-categorie/create-categorie.component';
import { PutCategorieComponent } from './Components/CategorieComponent/put-categorie/put-categorie.component';
import { PaysComponent } from './Components/PaysComponent/pays/pays.component';
import { CreatePaysComponent } from './Components/PaysComponent/create-pays/create-pays.component';
import { PutPaysComponent } from './Components/PaysComponent/put-pays/put-pays.component';
import { NationaliteComponent } from './Components/NationaliteComponent/nationalite/nationalite.component';
import { CreateNationaliteComponent } from './Components/NationaliteComponent/create-nationalite/create-nationalite.component';
import { PutNationaliteComponent } from './Components/NationaliteComponent/put-nationalite/put-nationalite.component';
import { SituationFamilialeComponent } from './Components/SituationFamilialeComponent/situation-familiale/situation-familiale.component';
import { CreateSituationFamilialeComponent } from './Components/SituationFamilialeComponent/create-situation-familiale/create-situation-familiale.component';
import { PutSituationFamilialeComponent } from './Components/SituationFamilialeComponent/put-situation-familiale/put-situation-familiale.component';
import { PutLangueComponent } from './Components/LangueComponent/put-langue/put-langue.component';
import { LangueComponent } from './Components/LangueComponent/langue/langue.component';
import { CreateLangueComponent } from './Components/LangueComponent/create-langue/create-langue.component';
import { NatureClientComponent } from './Components/NatureClientComponent/nature-client/nature-client.component';
import { CreateNatureClientComponent } from './Components/NatureClientComponent/create-nature-client/create-nature-client.component';
import { PutNatureClientComponent } from './Components/NatureClientComponent/put-nature-client/put-nature-client.component';
import { MoyenLivraisonComponent } from './Components/MoyenLivraisonComponent/moyen-livraison/moyen-livraison.component';
import { CreateMoyenLivraisonComponent } from './Components/MoyenLivraisonComponent/create-moyen-livraison/create-moyen-livraison.component';
import { PutMoyenLivraisonComponent } from './Components/MoyenLivraisonComponent/put-moyen-livraison/put-moyen-livraison.component';
import { PutOrganismeDemandeurComponent } from './Components/OrganismeDemandeurComponent/put-organisme-demandeur/put-organisme-demandeur.component';
import { CreateOrganismeDemandeurComponent } from './Components/OrganismeDemandeurComponent/create-organisme-demandeur/create-organisme-demandeur.component';
import { OrganismeDemandeurComponent } from './Components/OrganismeDemandeurComponent/organisme-demandeur/organisme-demandeur.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PutAppelOffreComponent } from './Components/AppelOffreComponent/put-appel-offre/put-appel-offre.component';
import { ClientComponent } from './Components/ClientComponent/client/client.component';
import { RouterModule } from '@angular/router';
import { EmployeEducationComponent } from './Components/EmployeEducationComponent/employe-education/employe-education.component';
import { CreateEmployeEducationComponent } from './Components/EmployeEducationComponent/create-employe-education/create-employe-education.component';
import { PutEmployeEducationComponent } from './Components/EmployeEducationComponent/put-employe-education/put-employe-education.component';
import { EmployeExperienceComponent } from './Components/EmployeExperienceComponent/employe-experience/employe-experience.component';
import { CreateEmployeExperienceComponent } from './Components/EmployeExperienceComponent/create-employe-experience/create-employe-experience.component';
import { LieuxComponent } from './Components/LieuxComponent/lieux/lieux.component';
import { CreateLieuxComponent } from './Components/LieuxComponent/create-lieux/create-lieux.component';
import { PutLieuxComponent } from './Components/LieuxComponent/put-lieux/put-lieux.component';
import { ProjetPreuveComponent } from './Components/ProjetPreuveComponent/projet-preuve/projet-preuve.component';
import { CreateProjetPreuveComponent } from './Components/ProjetPreuveComponent/create-projet-preuve/create-projet-preuve.component';
import { EmployeComponent } from './Components/EmployeComponent/employe/employe.component';
import { CreateEmployeComponent } from './Components/EmployeComponent/create-employe/create-employe.component';
import { PosteComponent } from './Components/PosteComponent/poste/poste.component';
import { CreatePosteComponent } from './Components/PosteComponent/create-poste/create-poste.component';
import { PutPosteComponent } from './Components/PosteComponent/put-poste/put-poste.component';

import { ProjetEmployePosteComponent } from './Components/ProjetEmployePosteComponent/projet-employe-poste/projet-employe-poste.component';
import { CreateProjetEmployePosteComponent } from './Components/ProjetEmployePosteComponent/create-projet-employe-poste/create-projet-employe-poste.component';
import { PutProjetEmployePosteComponent } from './Components/ProjetEmployePosteComponent/put-projet-employe-poste/put-projet-employe-poste.component';
import { CreateClientComponent } from './Components/ClientComponent/create-client/create-client.component';
import { PutClientComponent } from './Components/ClientComponent/put-client/put-client.component';
import { PutEmployeComponent } from './Components/EmployeComponent/put-employe/put-employe.component';
import { ChangePasswordComponent } from './Components/AuthentificationComponent/change-password/change-password.component';
import { PutEmployeExperienceComponent } from './Components/EmployeExperienceComponent/put-employe-experience/put-employe-experience.component';

import { ClientDetailsComponent } from './Components/ClientComponent/client-details/client-details.component';
import { EmployeDetailsComponent } from './Components/EmployeComponent/employe-details/employe-details.component';
import { FichierComponent } from './Components/FichierComponent/fichier/fichier.component';
import { RapportComponent } from './Components/rapport/rapport.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateFileComponent } from './Components/FichierComponent/create-file/create-file.component';
import { AppelOffreComponent } from './Components/AppelOffreComponent/appel-offre/appel-offre.component';
import { AppelOffreDetailsComponent } from './Components/AppelOffreComponent/appel-offre-details/appel-offre-details.component';
import { CreateAppelOffreComponent } from './Components/AppelOffreComponent/create-appel-offre/create-appel-offre.component';
import { PutAppelOffreTypeComponent } from './Components/AppelOffreTypeComponent/put-appel-offre-type/put-appel-offre-type.component';
import { PutProjetPreuveComponent } from './Components/ProjetPreuveComponent/put-projet-preuve/put-projet-preuve.component';
import { CountTotalStatComponent } from './Components/StatstiqueComponent/count-total-stat/count-total-stat.component';
import { ProfilComponent } from './Components/AuthentificationComponent/profil/profil.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ConfirmPwdComponent } from './Components/AuthentificationComponent/confirm-pwd/confirm-pwd.component';
import { AdminUserComponent } from './Components/admin-user/admin-user.component';
import { ParametrageComponent } from './Components/parametrage/parametrage.component';
import { BailleurFondComponent } from './Components/BailleurFondComponent/bailleur-fond/bailleur-fond.component';
import { DevisesComponent } from './Components/DevisesComponent/devises/devises.component';
import { EnvironnementDeveloppementComponent } from './Components/EnvironnementDeveloppementComponent/environnement-developpement/environnement-developpement.component';
import { MethodologieComponent } from './Components/MethodologieComponent/methodologie/methodologie.component';
import { TechnologieComponent } from './Components/TechnologieComponent/technologie/technologie.component';
import {
  CreateBailleurFondComponent
} from "./Components/BailleurFondComponent/create-bailleur-fond/create-bailleur-fond.component";
import {
  UpdateBailleurFondComponent
} from "./Components/BailleurFondComponent/update-bailleur-fond/update-bailleur-fond.component";
import {CreateDevisesComponent} from "./Components/DevisesComponent/create-devises/create-devises.component";
import {UpdateDevisesComponent} from "./Components/DevisesComponent/update-devises/update-devises.component";
import {
  CreateEnvironnementDeveloppementComponent
} from "./Components/EnvironnementDeveloppementComponent/create-environnement-developpement/create-environnement-developpement.component";
import {
  UpdateEnvironnementDeveloppementComponent
} from "./Components/EnvironnementDeveloppementComponent/update-environnement-developpement/update-environnement-developpement.component";
import {
  CreateMethodologieComponent
} from "./Components/MethodologieComponent/create-methodologie/create-methodologie.component";
import {
  UpdateMethodologieComponent
} from "./Components/MethodologieComponent/update-methodologie/update-methodologie.component";
import {
  UpdateTechnologieComponent
} from "./Components/TechnologieComponent/update-technologie/update-technologie.component";
import {
  CreateTechnologieComponent
} from "./Components/TechnologieComponent/create-technologie/create-technologie.component";
import { SecteurActiviteComponent } from './Components/SecteurActiviteComponent/secteur-activite/secteur-activite.component';
import { CreateSecteurActiviteComponent } from './Components/SecteurActiviteComponent/create-secteur-activite/create-secteur-activite.component';
import { UpdateSecteurActiviteComponent } from './Components/SecteurActiviteComponent/update-secteur-activite/update-secteur-activite.component';
import {ReferenceComponent} from "./Components/ReferenceComponent/reference/reference.component";
import {PutReferenceComponent} from "./Components/ReferenceComponent/put-reference/put-reference.component";
import {CreateReferenceComponent} from "./Components/ReferenceComponent/create-reference/create-reference.component";
import {ReferenceDetailsComponent} from "./Components/ReferenceComponent/reference-details/reference-details.component";


import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReferenceDocumentsComponent } from './Components/ReferenceDocumentsComponent/reference-documents/reference-documents.component';
import { CreateReferenceDocumentsComponent } from './Components/ReferenceDocumentsComponent/create-reference-documents/create-reference-documents.component';
import { UpdateReferenceDocumentsComponent } from './Components/ReferenceDocumentsComponent/update-reference-documents/update-reference-documents.component';
import { UpdateRoleComponent } from './Components/RoleComponent/update-role/update-role.component';
import { CreateRoleComponent } from './Components/RoleComponent/create-role/create-role.component';
import { RoleComponent } from './Components/RoleComponent/role/role.component';
import { TypeDocumentComponent } from './Components/TypeDocumentComponent/type-document/type-document.component';
import { CreateTypeDocumentComponent } from './Components/TypeDocumentComponent/create-type-document/create-type-document.component';
import { UpdateTypeDocumentComponent } from './Components/TypeDocumentComponent/update-type-document/update-type-document.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { CreateCvLangueNiveauComponent } from './Components/CvLangueNiveauComponent/create-cv-langue-niveau/create-cv-langue-niveau.component';
import { UpdateCvLangueNiveauComponent } from './Components/CvLangueNiveauComponent/update-cv-langue-niveau/update-cv-langue-niveau.component';
import { CvLangueNiveauComponent } from './Components/CvLangueNiveauComponent/cv-langue-niveau/cv-langue-niveau.component';
import { TypeDiplomeComponent } from './Components/TypeDiplomeComponent/type-diplome/type-diplome.component';
import { CreateTypeDiplomeComponent } from './Components/TypeDiplomeComponent/create-type-diplome/create-type-diplome.component';
import { UpdateTypeDiplomeComponent } from './Components/TypeDiplomeComponent/update-type-diplome/update-type-diplome.component';
import { ReferenceEmployeComponent } from './Components/ReferenceEmployeComponent/reference-employe/reference-employe.component';
import { CreateReferenceEmployeComponent } from './Components/ReferenceEmployeComponent/create-reference-employe/create-reference-employe.component';
import { UpdateReferenceEmployeComponent } from './Components/ReferenceEmployeComponent/update-reference-employe/update-reference-employe.component';
import { EmployePosteComponent } from './Components/EmployePosteComponent/employe-poste/employe-poste.component';
import { CreateEmployePosteComponent } from './Components/EmployePosteComponent/create-employe-poste/create-employe-poste.component';
import { UpdateEmployePosteComponent } from './Components/EmployePosteComponent/update-employe-poste/update-employe-poste.component';
import { EmployeLangueNiveauComponent } from './Components/EmployeLangueNiveauComponent/employe-langue-niveau/employe-langue-niveau.component';
import { CreateEmployeLangueNiveauComponent } from './Components/EmployeLangueNiveauComponent/create-employe-langue-niveau/create-employe-langue-niveau.component';
import { UpdateEmployeLangueNiveauComponent } from './Components/EmployeLangueNiveauComponent/update-employe-langue-niveau/update-employe-langue-niveau.component';
import { EmployeLangueComponent } from './Components/EmployeLangueComponent/employe-langue/employe-langue.component';
import { CreateEmployeLangueComponent } from './Components/EmployeLangueComponent/create-employe-langue/create-employe-langue.component';
import { UpdateEmployeLangueComponent } from './Components/EmployeLangueComponent/update-employe-langue/update-employe-langue.component';
import {EditorModule} from "primeng/editor";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RecoverpwComponent,
    SidebarComponent,
    AppelOffreComponent,
    CreateAppelOffreComponent,
    AppelOffreTypeComponent,
    CreateAppelOffreTypeComponent,
    PutAppelOffreTypeComponent,
    CategorieComponent,
    CreateCategorieComponent,
    PutCategorieComponent,
    PaysComponent,
    CreatePaysComponent,
    PutPaysComponent,
    NationaliteComponent,
    CreateNationaliteComponent,
    PutNationaliteComponent,
    SituationFamilialeComponent,
    CreateSituationFamilialeComponent,
    PutSituationFamilialeComponent,
    PutLangueComponent,
    LangueComponent,
    CreateLangueComponent,
    NatureClientComponent,
    ConfirmPwdComponent,
    CreateNatureClientComponent,
    PutNatureClientComponent,
    MoyenLivraisonComponent,
    CreateMoyenLivraisonComponent,
    PutMoyenLivraisonComponent,
    PutOrganismeDemandeurComponent,
    CreateOrganismeDemandeurComponent,
    OrganismeDemandeurComponent,
    PutAppelOffreComponent,
    ClientComponent,
    EmployeEducationComponent,
    CreateEmployeEducationComponent,
    PutEmployeEducationComponent,
    EmployeExperienceComponent,
    CreateEmployeExperienceComponent,
    LieuxComponent,
    CreateLieuxComponent,
    PutLieuxComponent,
    ProjetPreuveComponent,
    CreateProjetPreuveComponent,
    EmployeComponent,
    CreateEmployeComponent,
    PosteComponent,
    CreatePosteComponent,
    PutPosteComponent,
    PutProjetPreuveComponent,
    ProjetEmployePosteComponent,
    CreateProjetEmployePosteComponent,
    PutProjetEmployePosteComponent,
    CreateClientComponent,
    PutClientComponent,
    PutEmployeComponent,
    ChangePasswordComponent,
    PutEmployeExperienceComponent,
    AppelOffreDetailsComponent,
    ClientDetailsComponent,
    EmployeDetailsComponent,
    FichierComponent,
    RapportComponent,
    CreateFileComponent,
    CountTotalStatComponent,
    ProfilComponent,
    AdminUserComponent,
    ParametrageComponent,
    BailleurFondComponent,
    DevisesComponent,
    EnvironnementDeveloppementComponent,
    MethodologieComponent,
    TechnologieComponent,
    CreateBailleurFondComponent,
    UpdateBailleurFondComponent,
    CreateDevisesComponent,
    UpdateDevisesComponent,
    CreateEnvironnementDeveloppementComponent,
    UpdateEnvironnementDeveloppementComponent,
    CreateMethodologieComponent,
    UpdateMethodologieComponent,
    UpdateTechnologieComponent,
    CreateTechnologieComponent,
    SecteurActiviteComponent,
    CreateSecteurActiviteComponent,
    UpdateSecteurActiviteComponent,

    ReferenceComponent,
    PutReferenceComponent,
    CreateReferenceComponent,
    ReferenceDetailsComponent,
    ReferenceDocumentsComponent,
    CreateReferenceDocumentsComponent,
    UpdateReferenceDocumentsComponent,
    UpdateRoleComponent,
    CreateRoleComponent,
    RoleComponent,
    TypeDocumentComponent,
    CreateTypeDocumentComponent,
    UpdateTypeDocumentComponent,
    CreateCvLangueNiveauComponent,
    UpdateCvLangueNiveauComponent,
    CvLangueNiveauComponent,
    TypeDiplomeComponent,
    CreateTypeDiplomeComponent,
    UpdateTypeDiplomeComponent,
    ReferenceEmployeComponent,
    CreateReferenceEmployeComponent,
    UpdateReferenceEmployeComponent,
    EmployePosteComponent,
    CreateEmployePosteComponent,
    UpdateEmployePosteComponent,
    EmployeLangueNiveauComponent,
    CreateEmployeLangueNiveauComponent,
    UpdateEmployeLangueNiveauComponent,
    EmployeLangueComponent,
    CreateEmployeLangueComponent,
    UpdateEmployeLangueComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatMenuModule,
    NgxPaginationModule,
    NgbModule,
    NgApexchartsModule,

    CKEditorModule,
    MatSlideToggleModule,
    NgxMatSelectSearchModule,
    MatAutocompleteModule,
    MatSelectModule,


    PickListModule,
    MatCheckboxModule,
    MatExpansionModule,
    EditorModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
