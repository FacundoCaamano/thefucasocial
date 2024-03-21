import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService) { }


  login() {

    const email = 'testeodelogin@testeodelogin'
    const password = 'testeodelogin'
    this.authService.login(email, password)

  }
}
