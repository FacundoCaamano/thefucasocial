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

  public authUserId!:string | null
  public authUserName!:string | null

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
  this.httpClient.get<any>(`${this.url}userauth`,{withCredentials:true}).subscribe(
      {
        next:(data)=>{
          this._authUser$.next(data)      
        },
        error:()=>{
          console.log('no identificado');
          
        },
        complete:()=>{
          this.router.navigate(['dashboard/home'])        
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
      next:()=>{
        this._authUser$.next(null);
        this.authUserId = null
        this.authUserName = null
        console.log('eliminado');
        
        this.router.navigate(['auth/login']);  
      },
      error:()=>{
        console.log('error');
        
      },
      complete:()=>{
        console.log('completado');
        
      }
    })
  }
}
