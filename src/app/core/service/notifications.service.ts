import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _notifications$ = new BehaviorSubject<any>([])
  public  notifications$ = this._notifications$.asObservable()

  private _countNotifications$ = new BehaviorSubject<number>(0)
  public  countNotifications$ = this._countNotifications$.asObservable()
  

  constructor() { 
    this._notifications$
    .pipe(take(1))
    .subscribe({
      next:data =>{
        this._countNotifications$.next(data.length)
      }
    }
    )
  }

  setNotifications(notification:any){
    console.log(notification);
    
    this._notifications$
    .pipe(take(1))
    .subscribe({
      next: (data)=>{
         const updatedNotifications = [...data, notification];
         this._notifications$.next(updatedNotifications)
         this._countNotifications$.next(updatedNotifications.length)
      }
    })
  }

  clearCountNotifications(){
    this._countNotifications$.next(0)
  }
}
