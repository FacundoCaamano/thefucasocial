import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loader$ = new BehaviorSubject<boolean>(false)
  public loader$ = this._loader$.asObservable()
  
  constructor() { }

  setLoader(value:boolean){
    this._loader$.next(value)
  }

}
