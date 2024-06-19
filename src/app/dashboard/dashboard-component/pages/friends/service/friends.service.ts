import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NotificationsService } from 'src/app/core/service/notifications.service';
import { SocketService } from 'src/app/core/service/socket.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  #url = environment.urlApi

  private _usersSearch$ = new BehaviorSubject<any>(null)
  public usersSearch$ = this._usersSearch$.asObservable()

  private _friends$ = new BehaviorSubject<any>(null)
  public friends$ = this._friends$.asObservable()

  private _friendsRequests$ = new BehaviorSubject<any>(null)
  public friendsRequests$ = this._friendsRequests$.asObservable()

  private _selectFriend$  = new BehaviorSubject<any>(null)
  public selectFriend$ = this._selectFriend$.asObservable()

  constructor(
    private http: HttpClient, 
    private socketService:SocketService, 
    private authservice:AuthService,
    private notificationService:NotificationsService
  ) { 
   
  }

  getFriends(userId:string){
    this.http.get(this.#url + 'myfriends/' + userId,{withCredentials:true}).subscribe({
      next:(data)=>{
        this._friends$.next(data)
      }
    })
  }

  getFriendsRequest(userId:string){
    this.http.get(this.#url + 'friendsRequest/' + userId,{withCredentials:true}).subscribe({
      next:(data)=>{
        this._friendsRequests$.next(data)
      }
    })
  }

  sendFriendRequest(userId:string,friendId:string){ 
    this.http.post(this.#url + 'sendfriendrequest' , {userId,friendId},{withCredentials:true}).subscribe({
      next: (data) => {
        console.log('Solicitud de amistad enviada desde el cliente:', { userId, friendId });
        this.socketService.emit('sendFriendRequest', { userId, friendId });
      },
      error: (error) => {
        console.error('Error al enviar la solicitud de amistad:', error);
      }
    })
  }

  searchUsers(q:string,userId:string){
    this.http.get(this.#url + 'search',{ params: { q } })
    .pipe(map((users:any) =>  users.filter((user:any) => user._id !== userId)))
    .subscribe({
      next:(data)=>{
        this._usersSearch$.next(data)
      }
    })
  }
  acceptFriend(userId:string,friendId:string){
    this.http.post(this.#url + 'acceptfriend',{userId,friendId},{withCredentials:true})
    .pipe(mergeMap(()=> this._friendsRequests$.pipe(
      take(1),
      map((requests:Array<any>)=> {
        const filtrar = requests.filter(r => r._id !== friendId)
        return filtrar
      })
    )
  ))
    .subscribe({
      next:(requests)=>{
        this._friendsRequests$.next(requests)
      },
      error:(err)=>{
        console.log('error:', err);
        
      },
      complete:()=>{
        console.log('complete');
        
      }
    })
  }
  rejectRequest(userId:string,friendId:string){
    this.http.delete(this.#url + 'rejectfriend/' + userId + '/' + friendId,{withCredentials:true})
    .pipe(mergeMap((requests)=>{
      return this._friendsRequests$.pipe(
        take(1),
        map((data)=>{
          const filtrar = data.filter((r:any)=> r._id !== friendId )
          return filtrar
        })
      )
    }))
    .subscribe({
      next:(data)=>{
        this._friendsRequests$.next(data)
      }
    })
  }
  clearSearch(){
    this._usersSearch$.next(null)
  }

  deleteFriend(userId:string, friendId:string){
    this.http.delete(this.#url + 'friend-delete/' + userId + '/' + friendId,{withCredentials:true})
    .subscribe({
      next:(data)=>{
        console.log(data);
        
      }
    })
  }

  selectFriend(friend:any){
    this._selectFriend$.next(friend)
    
  } 

  listenForFriendRequests(){
     this.socketService.on('friendRequestReceived',(data)=>{
       this.getFriendsRequest(this.authservice.authUserId)
       try{
        this.notificationService.setNotifications('nueva solicitud de amistad')
       }catch(error){
        console.error('Error al establecer la notificación:', error);
       }
     } ) 
  }
}
