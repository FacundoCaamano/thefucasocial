import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser, User } from '../models/users';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, take, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private url = environment.urlApi
  private _authUser$ = new BehaviorSubject<any>(null)
  public  authUser$ = this._authUser$.asObservable()
  
  constructor(private httpClient:HttpClient, private router:Router) {}


    registerUser(name:string,email:string,password:string){  
    return this.httpClient.post(this.url + 'create-user', {name,email,password}).subscribe({
      next:(data)=>{
        this.router.navigate(['auth/login'])
      },
      error:(data)=>{
        alert('error')
      }
    })
    
  }

  login(email: string, password: string) {
    this.httpClient.post<any>(this.url + 'login', { email, password })
    .pipe(take(1))
    .subscribe({
      next:(data:any)=>{
        const userData:any = jwtDecode(data)
        this._authUser$.next(userData.token)
        this.router.navigate(['dashboard/home'])
      }
    })

  }

  checkToken(){
   const token = localStorage.getItem('token')
   if(token){
    const userData:any = jwtDecode(token)
    this._authUser$.next(userData.token)
   } 
  }

  


}
