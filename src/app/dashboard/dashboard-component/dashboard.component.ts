import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/service/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;
  darkMode!: Observable<boolean>
  constructor(private themeService:ThemeService){
    this.darkMode = this.themeService.darkMode
  }
  

}
