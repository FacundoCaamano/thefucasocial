import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject,} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.urlApi
  private _authUser$ = new BehaviorSubject<any>(null)
  public authUser$ = this._authUser$.asObservable()

  public authUserId!:string
  public authUserName!:string

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { 
    this.authUser$.subscribe(
      data =>{
        if(data){
          this.authUserId = data._id
          this.authUserName = data.name
        } 
      }
    )
  }

  authUser() {
   return this.httpClient.get<any>(`${this.url}userauth`,{withCredentials:true}).subscribe(
      {
        next:(data)=>{
          this._authUser$.next(data?.usuario)  
          this.router.navigate(['dashboard/home'])        
        },
        error:()=>{
          console.log('no identificado');
          
        }
      }
    )
  }
  loginPassport(email: string, password: string) {
    this.httpClient.post(this.url + 'login', { email, password }, { withCredentials: true }).subscribe(
      {
        next: (data:any) => {
          this._authUser$.next(data);
        
          this.router.navigate(['dashboard/home'])

        }
      }
    )
  }
 
  registerUserPassport(name: string, email: string, password: string) {
    return this.httpClient.post(this.url + 'register', { name, email, password }).subscribe({
      next: (data) => {
        this.router.navigate(['auth/login'])
      },
      error: (data) => {
        alert('error')
      }
    })

  }
  
  logout() {
    this.httpClient.get(this.url + 'logout',{withCredentials:true}).subscribe({
      complete:()=>{
        this._authUser$.next(null);
        this.router.navigate(['auth/login']);  
      }
    })
  }
}
