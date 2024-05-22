import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  constructor(private http: HttpClient) { 
   
  }

  getFriends(userId:string){
    this.http.get(this.#url + 'myfriends/' + userId).subscribe({
      next:(data)=>{
        this._friends$.next(data)
      }
    })
  }

  getFriendsRequest(userId:string){
    this.http.get(this.#url + 'friendsRequest/' + userId).subscribe({
      next:(data)=>{
        this._friendsRequests$.next(data)
      }
    })
  }

  sendFriendRequest(userId:string,friendId:string){ 
    this.http.post(this.#url + 'sendfriendrequest' , {userId,friendId}).subscribe({})
  }

  searchUsers(q:string){
    this.http.get(this.#url + 'search',{ params: { q } }).subscribe({
      next:(data)=>{
        this._usersSearch$.next(data)
      }
    })
  }
  acceptFriend(userId:string,friendId:string){
    this.http.post(this.#url + 'acceptfriend',{userId,friendId}).subscribe()
  }
  rejectRequest(userId:string,friendId:string){
    this.http.delete(this.#url + 'rejectfriend/' + userId + '/' + friendId).subscribe()
  }
  clearSearch(){
    this._usersSearch$.next(null)
  }

}
