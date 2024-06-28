import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/service/auth.service';
import { SocketService } from './core/service/socket.service';
import { FriendsService } from './dashboard/dashboard-component/pages/friends/service/friends.service';

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
    private socketService:SocketService,
    private friendService:FriendsService
  ){
  }
  ngOnInit(): void {
    setTimeout(()=>{

      this.authService.authUser()
    },1000)
    this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId = data._id
          
          this.friendService.getFriends(this.userId)
          this.socketService.connect(data._id);
          this.friendService.listenForFriendRequests()
        }
      }
    )
  
  }

  ngOnDestroy(){
    this.socketService.disconnect()
  }

}
