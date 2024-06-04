import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/service/socket.service';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent implements OnInit {
  notifications:any[]= []

  constructor(private socketService: SocketService){


  }
  ngOnInit(): void {
    
  }


}
