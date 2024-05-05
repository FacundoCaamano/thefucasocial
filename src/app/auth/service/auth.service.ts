import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { BehaviorSubject,} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.urlApi
  private _authUser$ = new BehaviorSubject<any>(null)
  public authUser$ = this._authUser$.asObservable()

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }

  authUser() {
    return this.httpClient.get<any>(`${this.url}userauth`,{withCredentials:true}).subscribe(
      {
        next:(data)=>{
          this._authUser$.next(data?.usuario)          
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
  
  logout() {
    this.httpClient.get(this.url + 'logout',{withCredentials:true}).subscribe({
      complete:()=>{
        this._authUser$.next(null);
        this.router.navigate(['auth/login']);  
      }
    })
  }
}
