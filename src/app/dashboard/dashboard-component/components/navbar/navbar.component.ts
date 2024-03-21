import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
 showFiller = false;
  width = window.innerWidth
  constructor(){

    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.width = window.innerWidth;

  }
}
