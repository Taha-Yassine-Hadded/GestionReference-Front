import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/LoginService/login.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  userProfile: any;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.loginService.getProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}