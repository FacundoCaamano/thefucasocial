import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { SocketService } from 'src/app/core/service/socket.service';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
   notifications:Observable<any>
  constructor(private socketService: SocketService, private notificationS:NotificationsService){

    this.notifications = this.notificationS.notifications$
  }
  ngOnInit(): void {
    
  }


}
