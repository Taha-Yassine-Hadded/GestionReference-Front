import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/AuthentificationComponent/login/login.component';
import { SignupComponent } from './Components/AuthentificationComponent/signup/signup.component';

import { AppelOffreComponent } from './Components/AppelOffreComponent/appel-offre/appel-offre.component';
import { CreateAppelOffreComponent } from './Components/AppelOffreComponent/create-appel-offre/create-appel-offre.component';
import { AppelOffreTypeComponent } from './Components/AppelOffreTypeComponent/appel-offre-type/appel-offre-type.component';
import { CreateAppelOffreTypeComponent } from './Components/AppelOffreTypeComponent/create-appel-offre-type/create-appel-offre-type.component';

import { PutAppelOffreTypeComponent } from './Components/AppelOffreTypeComponent/put-appel-offre-type/put-appel-offre-type.component';

import { RecoverpwComponent } from './Components/AuthentificationComponent/recoverpw/recoverpw.component';
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
import { CreateLangueComponent } from './Components/LangueComponent/create-langue/create-langue.component';
import { LangueComponent } from './Components/LangueComponent/langue/langue.component';
import { NatureClientComponent } from './Components/NatureClientComponent/nature-client/nature-client.component';
import { CreateNatureClientComponent } from './Components/NatureClientComponent/create-nature-client/create-nature-client.component';
import { PutNatureClientComponent } from './Components/NatureClientComponent/put-nature-client/put-nature-client.component';

import { CreateMoyenLivraisonComponent } from './Components/MoyenLivraisonComponent/create-moyen-livraison/create-moyen-livraison.component';
import { PutMoyenLivraisonComponent } from './Components/MoyenLivraisonComponent/put-moyen-livraison/put-moyen-livraison.component';
import { OrganismeDemandeurComponent } from './Components/OrganismeDemandeurComponent/organisme-demandeur/organisme-demandeur.component';
import { CreateOrganismeDemandeurComponent } from './Components/OrganismeDemandeurComponent/create-organisme-demandeur/create-organisme-demandeur.component';
import { PutOrganismeDemandeurComponent } from './Components/OrganismeDemandeurComponent/put-organisme-demandeur/put-organisme-demandeur.component';
import { PutAppelOffreComponent } from './Components/AppelOffreComponent/put-appel-offre/put-appel-offre.component';
import { ClientComponent } from './Components/ClientComponent/client/client.component';
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
import { PutProjetPreuveComponent } from './Components/ProjetPreuveComponent/put-projet-preuve/put-projet-preuve.component';
import { ProjetEmployePosteComponent } from './Components/ProjetEmployePosteComponent/projet-employe-poste/projet-employe-poste.component';
import { CreateProjetEmployePosteComponent } from './Components/ProjetEmployePosteComponent/create-projet-employe-poste/create-projet-employe-poste.component';
import { PutProjetEmployePosteComponent } from './Components/ProjetEmployePosteComponent/put-projet-employe-poste/put-projet-employe-poste.component';
import { CreateClientComponent } from './Components/ClientComponent/create-client/create-client.component';
import { PutClientComponent } from './Components/ClientComponent/put-client/put-client.component';
import { PutEmployeComponent } from './Components/EmployeComponent/put-employe/put-employe.component';
import { ChangePasswordComponent } from './Components/AuthentificationComponent/change-password/change-password.component';
import { PutEmployeExperienceComponent } from './Components/EmployeExperienceComponent/put-employe-experience/put-employe-experience.component';
import { AppelOffreDetailsComponent } from './Components/AppelOffreComponent/appel-offre-details/appel-offre-details.component';
import { ClientDetailsComponent } from './Components/ClientComponent/client-details/client-details.component';
import { EmployeDetailsComponent } from './Components/EmployeComponent/employe-details/employe-details.component';
import { FichierComponent } from './Components/FichierComponent/fichier/fichier.component';
import { RapportComponent } from './Components/rapport/rapport.component';
import { CreateFileComponent } from './Components/FichierComponent/create-file/create-file.component';
import { MoyenLivraisonComponent } from './Components/MoyenLivraisonComponent/moyen-livraison/moyen-livraison.component';
import { CountTotalStatComponent } from './Components/StatstiqueComponent/count-total-stat/count-total-stat.component'
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ProfilComponent } from './Components/AuthentificationComponent/profil/profil.component';

import { ConfirmPwdComponent } from './Components/AuthentificationComponent/confirm-pwd/confirm-pwd.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AdminUserComponent } from './Components/admin-user/admin-user.component';
import {ParametrageComponent} from "./Components/parametrage/parametrage.component";
import {BailleurFondComponent} from "./Components/BailleurFondComponent/bailleur-fond/bailleur-fond.component";
import {DevisesComponent} from "./Components/DevisesComponent/devises/devises.component";
import {
  EnvironnementDeveloppementComponent
} from "./Components/EnvironnementDeveloppementComponent/environnement-developpement/environnement-developpement.component";
import {MethodologieComponent} from "./Components/MethodologieComponent/methodologie/methodologie.component";
import {TechnologieComponent} from "./Components/TechnologieComponent/technologie/technologie.component";
import {
  CreateBailleurFondComponent
} from "./Components/BailleurFondComponent/create-bailleur-fond/create-bailleur-fond.component";
import {
  UpdateBailleurFondComponent
} from "./Components/BailleurFondComponent/update-bailleur-fond/update-bailleur-fond.component";
import {CreateDevisesComponent} from "./Components/DevisesComponent/create-devises/create-devises.component";
import {
  CreateEnvironnementDeveloppementComponent
} from "./Components/EnvironnementDeveloppementComponent/create-environnement-developpement/create-environnement-developpement.component";
import {
  CreateMethodologieComponent
} from "./Components/MethodologieComponent/create-methodologie/create-methodologie.component";
import {
  CreateTechnologieComponent
} from "./Components/TechnologieComponent/create-technologie/create-technologie.component";
import {UpdateDevisesComponent} from "./Components/DevisesComponent/update-devises/update-devises.component";
import {
  UpdateEnvironnementDeveloppementComponent
} from "./Components/EnvironnementDeveloppementComponent/update-environnement-developpement/update-environnement-developpement.component";
import {
  UpdateMethodologieComponent
} from "./Components/MethodologieComponent/update-methodologie/update-methodologie.component";
import {
  UpdateTechnologieComponent
} from "./Components/TechnologieComponent/update-technologie/update-technologie.component";
import {
  SecteurActiviteComponent
} from "./Components/SecteurActiviteComponent/secteur-activite/secteur-activite.component";
import {
  CreateSecteurActiviteComponent
} from "./Components/SecteurActiviteComponent/create-secteur-activite/create-secteur-activite.component";
import {
  UpdateSecteurActiviteComponent
} from "./Components/SecteurActiviteComponent/update-secteur-activite/update-secteur-activite.component";
import {CreateReferenceComponent} from "./Components/ReferenceComponent/create-reference/create-reference.component";
import {ReferenceDetailsComponent} from "./Components/ReferenceComponent/reference-details/reference-details.component";
import {ReferenceComponent} from "./Components/ReferenceComponent/reference/reference.component";
import {PutReferenceComponent} from "./Components/ReferenceComponent/put-reference/put-reference.component";
import {
  ReferenceDocumentsComponent
} from "./Components/ReferenceDocumentsComponent/reference-documents/reference-documents.component";
import {
  CreateReferenceDocumentsComponent
} from "./Components/ReferenceDocumentsComponent/create-reference-documents/create-reference-documents.component";
import {
  UpdateReferenceDocumentsComponent
} from "./Components/ReferenceDocumentsComponent/update-reference-documents/update-reference-documents.component";
import {RoleComponent} from "./Components/RoleComponent/role/role.component";
import {CreateRoleComponent} from "./Components/RoleComponent/create-role/create-role.component";
import {UpdateRoleComponent} from "./Components/RoleComponent/update-role/update-role.component";
import {TypeDocumentComponent} from "./Components/TypeDocumentComponent/type-document/type-document.component";
import {
  CreateTypeDocumentComponent
} from "./Components/TypeDocumentComponent/create-type-document/create-type-document.component";
import {
  UpdateTypeDocumentComponent
} from "./Components/TypeDocumentComponent/update-type-document/update-type-document.component";
import {
  CvLangueNiveauComponent
} from "./Components/CvLangueNiveauComponent/cv-langue-niveau/cv-langue-niveau.component";
import {
  CreateCvLangueNiveauComponent
} from "./Components/CvLangueNiveauComponent/create-cv-langue-niveau/create-cv-langue-niveau.component";
import {
  UpdateCvLangueNiveauComponent
} from "./Components/CvLangueNiveauComponent/update-cv-langue-niveau/update-cv-langue-niveau.component";
import {TypeDiplomeComponent} from "./Components/TypeDiplomeComponent/type-diplome/type-diplome.component";
import {
  ReferenceEmployeComponent
} from "./Components/ReferenceEmployeComponent/reference-employe/reference-employe.component";
import {EmployePosteComponent} from "./Components/EmployePosteComponent/employe-poste/employe-poste.component";
import {
  EmployeLangueNiveauComponent
} from "./Components/EmployeLangueNiveauComponent/employe-langue-niveau/employe-langue-niveau.component";
import {EmployeLangueComponent} from "./Components/EmployeLangueComponent/employe-langue/employe-langue.component";
import {
  CreateTypeDiplomeComponent
} from "./Components/TypeDiplomeComponent/create-type-diplome/create-type-diplome.component";
import {
  CreateReferenceEmployeComponent
} from "./Components/ReferenceEmployeComponent/create-reference-employe/create-reference-employe.component";
import {
  CreateEmployePosteComponent
} from "./Components/EmployePosteComponent/create-employe-poste/create-employe-poste.component";
import {
  CreateEmployeLangueNiveauComponent
} from "./Components/EmployeLangueNiveauComponent/create-employe-langue-niveau/create-employe-langue-niveau.component";
import {
  CreateEmployeLangueComponent
} from "./Components/EmployeLangueComponent/create-employe-langue/create-employe-langue.component";
import {
  UpdateTypeDiplomeComponent
} from "./Components/TypeDiplomeComponent/update-type-diplome/update-type-diplome.component";
import {
  UpdateReferenceEmployeComponent
} from "./Components/ReferenceEmployeComponent/update-reference-employe/update-reference-employe.component";
import {
  UpdateEmployePosteComponent
} from "./Components/EmployePosteComponent/update-employe-poste/update-employe-poste.component";
import {
  UpdateEmployeLangueNiveauComponent
} from "./Components/EmployeLangueNiveauComponent/update-employe-langue-niveau/update-employe-langue-niveau.component";
import {
  UpdateEmployeLangueComponent
} from "./Components/EmployeLangueComponent/update-employe-langue/update-employe-langue.component";









const routes: Routes = [

  { path: 'signin', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'recoverPw', component: RecoverpwComponent  },
  { path: 'getEmploye', component: EmployeComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'login', component: LoginComponent  },
  { path: 'sideBar', component: SidebarComponent , canActivate: [AuthGuard] },
  { path: 'getAppelOffre', component:  AppelOffreComponent  , canActivate: [AuthGuard] },
  { path: 'createAppelOffre', component: CreateAppelOffreComponent  , canActivate: [AuthGuard] },
  { path: 'getAppelOffreType', component: AppelOffreTypeComponent  , canActivate: [AuthGuard] },
  { path: 'createAppelOffreType', component: CreateAppelOffreTypeComponent  , canActivate: [AuthGuard] },
  { path: 'putAppelOffreType/:id', component: PutAppelOffreTypeComponent , canActivate: [AuthGuard]  },
  { path: 'putPays/:id', component: PutPaysComponent , canActivate: [AuthGuard]  },
  { path: 'getCategorie', component: CategorieComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'getNationalite', component: NationaliteComponent , canActivate: [AuthGuard] },
  { path: 'putCategorie/:id', component: PutCategorieComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'putNationalite/:id', component: PutNationaliteComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'putEmploye/:id', component: PutEmployeComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'putSituation/:id', component: PutSituationFamilialeComponent   , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'putExperience/:id', component: PutEmployeExperienceComponent   , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'getPays', component: PaysComponent  , canActivate: [AuthGuard]  },
  { path: 'createCategorie', component: CreateCategorieComponent   , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createPreuve', component: CreateProjetPreuveComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createEmploye', component: CreateEmployeComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'putLangue/:id', component: PutLangueComponent   , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'putNatureClient/:id', component: PutNatureClientComponent  , canActivate: [AuthGuard]   },
  { path: 'putClient/:id', component: PutClientComponent  , canActivate: [AuthGuard]   },
  { path: 'putOrganisme/:id', component: PutOrganismeDemandeurComponent , canActivate: [AuthGuard]    },
  { path: 'putLivraison/:id', component: PutMoyenLivraisonComponent   , canActivate: [AuthGuard]  },
  { path: 'putAppelOffre/:id', component: PutAppelOffreComponent   , canActivate: [AuthGuard]  },
  { path: 'putEducation/:id', component: PutEmployeEducationComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'getLangue', component: LangueComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'getExperience', component:EmployeExperienceComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'getClient', component: ClientComponent  , canActivate: [AuthGuard] },
  { path: 'getOrganisme', component: OrganismeDemandeurComponent ,canActivate: [AuthGuard] },
  { path: 'getEmployePoste', component: ProjetEmployePosteComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'putEmployePoste/:id', component: PutProjetEmployePosteComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createProjetEmploye', component: CreateProjetEmployePosteComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'putPoste/:id', component: PutPosteComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'putPreuve/:id', component: PutProjetPreuveComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'putLieu/:id', component: PutLieuxComponent , canActivate: [AuthGuard]  },
  { path: 'getNature', component: NatureClientComponent  , canActivate: [AuthGuard] },
  { path: 'getPreuve', component:ProjetPreuveComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'getLieu', component: LieuxComponent  , canActivate: [AuthGuard] },
  { path: 'getEducation', component: EmployeEducationComponent  ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createEducation', component: CreateEmployeEducationComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createLieu', component: CreateLieuxComponent  , canActivate: [AuthGuard]  },
  { path: 'createClient', component: CreateClientComponent  , canActivate: [AuthGuard]  },
  { path: 'createExperience', component: CreateEmployeExperienceComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'poste', component: PosteComponent  ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createPoste', component: CreatePosteComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createLangue', component: CreateLangueComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createOrganisme', component: CreateOrganismeDemandeurComponent  , canActivate: [AuthGuard]  },
  { path: 'createLivraison', component: CreateMoyenLivraisonComponent , canActivate: [AuthGuard]  },
  { path: 'getSituation', component: SituationFamilialeComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createNationalite', component: CreateNationaliteComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createSituation', component: CreateSituationFamilialeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createNatureClient', component: CreateNatureClientComponent, canActivate: [AuthGuard] },
  { path: 'createPays', component: CreatePaysComponent  , canActivate: [AuthGuard]  },
  { path: 'createFile', component: CreateFileComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'changePwd', component: ChangePasswordComponent  , canActivate: [AuthGuard] },
  { path: 'files', component: FichierComponent  , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'appel-offre-details/:id', component: AppelOffreDetailsComponent , canActivate: [AuthGuard]   },
  { path: 'client-details/:id', component: ClientDetailsComponent , canActivate: [AuthGuard]  },
  { path: 'employe-details/:id', component: EmployeDetailsComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'rapport', component: RapportComponent , canActivate: [AuthGuard]},
  { path: 'moyenLivraison', component: MoyenLivraisonComponent , canActivate: [AuthGuard]},
  { path: 'stat', component: CountTotalStatComponent , canActivate: [AuthGuard]},
  { path: 'profile', component: ProfilComponent , canActivate: [AuthGuard]},
  { path: 'confirmPwd/:token', component: ConfirmPwdComponent   },
  { path: 'users', component:   AdminUserComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },

  { path: 'parametrage', component: ParametrageComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'bailleurFond', component: BailleurFondComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'devises', component: DevisesComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'envDev', component: EnvironnementDeveloppementComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'methodologie', component: MethodologieComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'technologie', component: TechnologieComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'secteurActivite', component: SecteurActiviteComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'referenceDocuments', component: ReferenceDocumentsComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'role', component: RoleComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'typeDocument', component: TypeDocumentComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'cvLangueNiveau', component: CvLangueNiveauComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'typeDiplome', component: TypeDiplomeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'referenceEmploye', component: ReferenceEmployeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'employePoste', component: EmployePosteComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'employeLangueNiveau', component: EmployeLangueNiveauComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'employeLangue', component: EmployeLangueComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },



  { path: 'createBailleurFond', component: CreateBailleurFondComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createDevises', component: CreateDevisesComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createEnvironnementDeveloppement', component: CreateEnvironnementDeveloppementComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createMethodologie', component: CreateMethodologieComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createTechnologie', component: CreateTechnologieComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createSecteurActivite', component: CreateSecteurActiviteComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createReferenceDocument', component: CreateReferenceDocumentsComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createRole', component: CreateRoleComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createTypeDocument', component: CreateTypeDocumentComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createCvLangueNiveau', component: CreateCvLangueNiveauComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'createTypeDiplome', component: CreateTypeDiplomeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createReferenceEmploye', component: CreateReferenceEmployeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createEmployePoste', component: CreateEmployePosteComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createEmployeLangueNiveau', component: CreateEmployeLangueNiveauComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'createEmployeLangue', component: CreateEmployeLangueComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },



  { path: 'updateBailleurFond/:id', component: UpdateBailleurFondComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateDevises/:id', component: UpdateDevisesComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateEnvironnementDeveloppement/:id', component: UpdateEnvironnementDeveloppementComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateMethodologie/:id', component: UpdateMethodologieComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateTechnologie/:id', component: UpdateTechnologieComponent , canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateSecteurActivite/:id', component: UpdateSecteurActiviteComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateReferenceDocument/:id', component: UpdateReferenceDocumentsComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateRole/:id', component: UpdateRoleComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateTypeDocument/:id', component: UpdateTypeDocumentComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateCvLangueNiveau/:id', component: UpdateCvLangueNiveauComponent,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' }  },
  { path: 'updateTypeDiplome/:id', component: UpdateTypeDiplomeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'updateReferenceEmploye/:id', component: UpdateReferenceEmployeComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'updateEmployePoste/:id', component: UpdateEmployePosteComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'updateEmployeLangueNiveau/:id', component: UpdateEmployeLangueNiveauComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'updateEmployeLangue/:id', component: UpdateEmployeLangueComponent ,canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },

  { path: 'getReference', component: ReferenceComponent, canActivate: [AuthGuard] },
  { path: 'reference-details/:id', component: ReferenceDetailsComponent },
  { path: 'createReference', component: CreateReferenceComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },
  { path: 'putReference/:id', component: PutReferenceComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'ROLE_ADMIN' } },


  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'default',  // Redirect to a 'default' path (explained below)
  },
  { path: '**', redirectTo: 'signin' }  // Wildcard route to handle undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
      useHash: true
  }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
