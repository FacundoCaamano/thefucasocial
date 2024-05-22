import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../../service/friends.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnDestroy {

  friendsList$!:Observable<any>
  userId!:string
  subscription!:Subscription
  constructor(private friendsService:FriendsService, private authService:AuthService){
    this.subscription = this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId = data._id
          this.friendsService.getFriends(this.userId)
          this.friendsList$ = this.friendsService.friends$
        }
      }
    )
  } 

  ngOnDestroy(): void {
  this.subscription.unsubscribe()
  }
}
