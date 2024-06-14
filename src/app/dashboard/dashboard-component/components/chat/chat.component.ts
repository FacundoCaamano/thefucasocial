import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../../pages/friends/service/friends.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  navChatActive: boolean = false
  myFriendsChat!: Observable<any[]>
  userSelect: any = null
  constructor(private friendsService: FriendsService) {
  }
  ngOnInit(): void {
    this.myFriendsChat = this.friendsService.friends$
    
  }

  setChatMode() {
    this.navChatActive = !this.navChatActive
  }

  selectUser(user: any) {
    this.userSelect = user
    
  }
  clearSelectUser() {
    this.userSelect = null
  }
}
