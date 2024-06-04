import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { SocketService } from './core/service/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy  {
  title = 'theFucaSocial';
  userId!:string
  constructor(
    private authService:AuthService,
    private socketService:SocketService
  ){
  }
  ngOnInit(): void {
    this.authService.authUser()
    this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId = data._id
          
          
          this.socketService.connect(data._id);
        }
      }
    )
  
  }

  ngOnDestroy(){
    this.socketService.disconnect()
  }

}
