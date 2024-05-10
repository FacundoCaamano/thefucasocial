import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkMode$ = new BehaviorSubject<boolean>(false)
  public darkMode = this._darkMode$.asObservable()
  constructor() { }

  setDarkMode(){
    this._darkMode$.pipe(take(1)).subscribe({
      next:(data)=>{
        this._darkMode$.next(!data)
      }
    })
    
  }
}
