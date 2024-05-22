import { Component, OnDestroy } from '@angular/core';
import { FriendsService } from '../../service/friends.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

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
  constructor(private friendService:FriendsService,private authService:AuthService){
    this.subscription= this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId = data._id
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onSearch(){
    if(this.query.length > 2){
      this.friendService.searchUsers(this.query)
      this.searchFriends = this.friendService.usersSearch$
    }else{
      this.friendService.clearSearch()
    }
  }
  sendRequest(friendId:string){
    this.friendService.sendFriendRequest(this.userId,friendId)
    
    
  }
}
