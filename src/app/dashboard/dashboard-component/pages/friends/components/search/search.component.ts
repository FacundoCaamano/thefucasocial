import { Component, OnDestroy } from '@angular/core';
import { FriendsService } from '../../service/friends.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { User } from 'src/app/auth/models/users';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnDestroy {

  query = ''
  userId!:string
  searchFriends!:Observable<any>
  subscription!:Subscription
  subscriptionFriends!:Subscription
  myFriends!:any[]
  isMyFriend!:boolean
  constructor(private friendService:FriendsService,private authService:AuthService){
    this.subscription= this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId = data._id
        }
      }
    )
    this.subscriptionFriends=this.friendService.friends$.subscribe(
      data => this.myFriends = data
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.subscriptionFriends.unsubscribe()
  }

  onSearch(){
    if(this.query.length > 2){
      this.friendService.searchUsers(this.query, this.userId)
      this.searchFriends = this.friendService.usersSearch$
    }else{
      this.friendService.clearSearch()
    }
  }
  sendRequest(friendId:string){
    this.friendService.sendFriendRequest(this.userId,friendId)
  }

  isFriend(friendId:string){
   return this.isMyFriend= this.myFriends?.some(friend => friend._id == friendId)
  }
}
