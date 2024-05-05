import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/auth/models/users';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  private _userData$ = new BehaviorSubject<User | null>(null)
  public userData$ = this._userData$.asObservable()
   #url = environment.urlApi
  constructor(private httpClient:HttpClient, private cookieService:CookieService ) { }

  // getProfile(_id: string) {

  //   const token = this.cookieService.get('tokencookie')
  //   const headers = new HttpHeaders({
  //     'Authorization': 'Bearer ' + token
  //   });
  
  //   // Realizar la solicitud HTTP con los encabezados
  //   this.httpClient.get<User>(this.#url + 'profile/' + _id, { headers }).subscribe({
  //     next: (data) => {
  //       this._userData$.next(data);
  //     },
  //     error: (error) => {
  //       console.error('Error al obtener el perfil:', error);
  //     },
  //     complete: () => {
  //       console.log('Petición completada');
  //     }
  //   });
  // }
}
