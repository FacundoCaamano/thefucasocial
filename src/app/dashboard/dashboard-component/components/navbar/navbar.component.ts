import { Component, HostListener, OnDestroy } from '@angular/core';
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
  suscription!:Subscription
  darkMode!:Observable<boolean>
  constructor(private authService:AuthService, private themeService: ThemeService){
   this.suscription = this.authService.authUser$.subscribe(
      data => this.name = data?.name
    )
    
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.width = window.innerWidth;
  }
  toggleTheme() {
    this.themeService.setDarkMode()
  }
}
