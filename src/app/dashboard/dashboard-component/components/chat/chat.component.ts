import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../../pages/friends/service/friends.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  navChatActive: boolean = false
  myFriendsChat!: Observable<any[]>
  userSelect: any = null
  subscription!:Subscription
  constructor(private friendsService: FriendsService) {
   
      this.subscription= this.friendsService.selectFriend$.subscribe(
        data => {
          if(data){
            this.navChatActive = !this.navChatActive
            console.log(data);
            this.userSelect = data
        }}
      )
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {
    this.myFriendsChat = this.friendsService.friends$
    
  }

  setChatMode() {
    this.navChatActive = !this.navChatActive
  }

  selectUser(user: any) {
    this.userSelect = user
    console.log(user);
    
    
  }
  clearSelectUser() {
    this.userSelect = null
  }

}
