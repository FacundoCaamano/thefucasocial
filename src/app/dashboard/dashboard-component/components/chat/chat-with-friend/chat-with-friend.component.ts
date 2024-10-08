import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './service/chat.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SocketService } from 'src/app/core/service/socket.service';

@Component({
  selector: 'app-chat-with-friend',
  templateUrl: './chat-with-friend.component.html',
  styleUrls: ['./chat-with-friend.component.scss']
})
export class ChatWithFriendComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  
  @ViewChild('chatContent') public chatContent!: ElementRef;

  @Input() userChat: any;
  @Input() friendId!: string;

  chat: Observable<any[]>;
  chatSubscription!: Subscription;
  userId!: string;
  message: string = '';

  loader:Observable<boolean>

  constructor(
    private chatService: ChatService, 
    private authService: AuthService,
    private socketService:SocketService
  ) {
    this.chat = this.chatService.messages$;
    this.userId = this.authService.authUserId as string;
    this.loader = this.chatService.loader$
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.socketService.connect(this.userId);
    this.chatService.getMessages(this.friendId);
    this.chatSubscription = this.chat.subscribe(() => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    this.chatService.clearChat()
    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    this.socketService.disconnect()
  }

  createMessage() {
    this.chatService.createMessages(this.userChat._id, this.message);
    this.message = '';
  }

  scrollToBottom(): void {
    if (this.chatContent) {
      try {
        const chatContentElement = this.chatContent.nativeElement;
        chatContentElement.scrollTop = chatContentElement.scrollHeight;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
