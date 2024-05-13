import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ThemeService } from 'src/app/core/service/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
 showFiller = false;
  width = window.innerWidth
  name!:string
  subscription = new Subscription()
  isDarkModeOn!:any
  constructor(private authService:AuthService, private themeService: ThemeService){
 
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
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.width = window.innerWidth;
  }
  toggleTheme() {
    this.themeService.setDarkMode()
  }
}
