import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { FriendsService } from '../../service/friends.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-request',
  templateUrl: './friends-request.component.html',
  styleUrls: ['./friends-request.component.scss']
})
export class FriendsRequestComponent implements OnDestroy, OnInit {

  userId!:string
  friendsRequests!:Observable<any>
  subscription!:Subscription
  constructor(private authService:AuthService, private friendService:FriendsService){
    this.subscription= this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId = data._id
          this.friendService.getFriendsRequest(this.userId)
        }
      }
    )
  }
  ngOnInit(): void {
    this.friendsRequests = this.friendService.friendsRequests$
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  accept(friendId:string){
    this.friendService.acceptFriend(this.userId, friendId)
  }
  reject(friendId:string){
    this.friendService.rejectRequest(this.userId, friendId)
  }
}
