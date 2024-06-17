import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { SocketService } from 'src/app/core/service/socket.service';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  #url = environment.urlApi;

  private _messages$ = new BehaviorSubject<Array<any>>([]);
  public messages$ = this._messages$.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private socketService: SocketService
  ) {
    this.socketService.on('newMessage', (message: any) => {
      this._messages$.pipe(
        take(1),
        map(arrayActual => [...arrayActual, message])
      ).subscribe(messages => {
        this._messages$.next(messages);
      });
    });
  }

  getMessages(friendId: string) {  
    this.http.get(this.#url + 'messages/' + this.authService.authUserId + '/' + friendId,{withCredentials:true}).subscribe(
      {
        next: (data: any) => {
          this._messages$.next(data);
        }
      }
    );
  } 

  createMessages(friendId: string, message: string) {
    const userId = this.authService.authUserId;
    const userName = this.authService.authUserName;

    const newMessage = { userId, userName, message, friendId, timestamp: new Date() };
    this.socketService.emit('sendMessage', newMessage);
    this._messages$.pipe(
      take(1),
      map(arrayActual => [...arrayActual, newMessage])
    ).subscribe(messages => {
      this._messages$.next(messages);
    });
  }
}