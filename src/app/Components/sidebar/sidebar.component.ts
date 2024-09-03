import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/Services/Notification/notification.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { AppelOffreService } from 'src/app/Services/AppelOffre/appel-offre.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', '../../../assets/css/bootstrap.min.css']
})
export class SidebarComponent implements OnInit {

  subMenuStates: boolean[] = [false, false, false, false];
  unreadNotificationCount = 0;
  notifications: any[] = [];
  username: string | null;
  isAdmin: boolean = false; 
  appelOffres$: Observable<any[]> = new Observable<any[]>();
  isSidebarOpen = false;
  constructor(
    private notificationService: NotificationService,
    private authService: LoginService, // Renommé de loginService à authService
    private appelOffreService: AppelOffreService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
    this.createNotifications();
    this.getUnreadNotificationCount();
    this.fetchNotifications();
    this.updateAdminStatus(); 
   
  }


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  updateAdminStatus() {
    this.isAdmin = this.authService.isAdmin();
  }
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  createNotifications() {
    this.notificationService.generateNotifications().subscribe(
      (response: any) => {
        this.getUnreadNotificationCount();
      },
      (error) => {
        console.error('Error creating notifications:', error);
      }
    );
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe(
      (notifications: any[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  getUnreadNotificationCount() {
    this.notificationService.getUnreadNotificationCount().subscribe(
      (response: any) => {
        this.unreadNotificationCount = response.unread_notification_count;
      },
      (error) => {
        console.error('Error fetching unread notification count:', error);
      }
    );
  }

  toggleSubMenu(index: number) {
    this.subMenuStates[index] = !this.subMenuStates[index];
  }

  logout(): void {
    this.notificationService.logout().subscribe(() => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('username');
      this.router.navigate(['/signin']);
    });
  }
}
