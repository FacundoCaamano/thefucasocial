import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../../service/friends.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFriendsOptionsComponent } from '../dialog-friends-options/dialog-friends-options.component';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnDestroy {
  panelOpenState = false;
  unboded = false;
  center = true
  friendsList$!:Observable<any>
  userId!:string
  subscription!:Subscription
  constructor(private friendsService:FriendsService, private authService:AuthService,public matDialog:MatDialog){
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

  openDialog(){
    const dialogRef = this.matDialog.open(DialogFriendsOptionsComponent)
  }

  ngOnDestroy(): void {
  this.subscription.unsubscribe()
  }

  onDeleteFriend(friendId:string){
    this.friendsService.deleteFriend(this.userId, friendId)
  }
}
