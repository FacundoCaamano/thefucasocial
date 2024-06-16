import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ThemeService } from 'src/app/core/service/theme.service';
import { NotifierComponent } from '../notifier/notifier.component';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  tooltipMessage: string = 'Enlace copiado';
  showFiller = false;
  width = window.innerWidth
  name!: string
  subscription = new Subscription()
  isDarkModeOn!: any
  newNotifications!: number
  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private notificationsService: NotificationsService,
    private _snackBar: MatSnackBar
  ) {

    this.subscription.add(
      this.authService.authUser$.subscribe(
        data => this.name = data?.name
      )
    );

    this.subscription.add(
      this.themeService.darkMode.subscribe(
        data => { this.isDarkModeOn = data; }
      )
    );
    this.subscription.add(
      this.notificationsService.countNotifications$.subscribe(
        data => this.newNotifications = data
      )
    )
  }

  butonsSendNotification(data: string) {
    this.notificationsService.setNotifications(data)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = window.innerWidth;
  }
  toggleTheme() {
    this.themeService.setDarkMode()
  }
  clearNotificationCount() {
    this.notificationsService.clearCountNotifications()
  }
  copy() {
    navigator.clipboard.writeText(location.toString()).then(() => {
      this._snackBar.open('Enlace copiado', 'Cerrar', {
        duration: 2000,
      });
    }, () => {
      this._snackBar.open('Error al copiar', 'Cerrar', {
        duration: 2000,
      });
    });
  }
  }

