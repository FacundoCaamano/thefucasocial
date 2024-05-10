import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/service/theme.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  darkMode!: Observable<boolean>
  constructor(private themeService:ThemeService){
    this.darkMode = this.themeService.darkMode
  }
}
