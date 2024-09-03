import {Component, OnInit} from '@angular/core';
import { LoginService } from './Services/LoginService/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'suivi_front';
  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/stat']);  // Redirect to /stat if logged in
    } else {
      this.router.navigate(['/signin']);  // Redirect to /signin if not logged in
    }
  }
}
