import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkMode$ = new BehaviorSubject<boolean>(false)
  public darkMode = this._darkMode$.asObservable()
  constructor() {
    this.setThemeByLocalStorage();
   }

  setThemeByLocalStorage(){
    const darkModeValue = localStorage.getItem('darkmode');
    if (darkModeValue !== null) {
      this._darkMode$.next(darkModeValue === 'true');
    }
  }
  setDarkMode(){
    this._darkMode$.pipe(take(1)).subscribe({
      next:(data)=>{
        const newMode = !data;
        this._darkMode$.next(!data)
        localStorage.setItem('darkmode', newMode.toString());
      }
    })
    
  }
}
