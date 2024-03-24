import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUser, User } from '../models/users';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, take, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private url = environment.urlApi
  private _authUser$ = new BehaviorSubject<any>(null)
  public  authUser$ = this._authUser$.asObservable()
  
  constructor(
    private httpClient:HttpClient,
    private router:Router,
    ) {}


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
    this.httpClient.post(this.url + 'login', {email, password}).subscribe(
      {
        next:(data)=>{
        localStorage.setItem('token', data as string)
         this._authUser$.next(data)
        }
      }
    )

  }

  authUser(){
    const token = localStorage.getItem('token');
    console.log(token);
    
    if(token){
      const headers = new HttpHeaders({
        'Authorization': token
      });
  
        this.httpClient.post(this.url + 'auth-check', {}, {headers: headers}).subscribe({
        next: (data) => {
          console.log(data);
        }
      });
    } else {
      console.log('No hay token almacenado en el localStorage');
    }
  }

 

  

  logout() {
    
    this._authUser$.next(null);
    this.router.navigate(['auth/login']);
  } 
}
