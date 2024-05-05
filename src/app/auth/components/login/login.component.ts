import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService:AuthService) { }

  emailControl = new FormControl<string>('testpassport@testpassport',[Validators.required,Validators.email])
  passControl = new FormControl<string >('testpassport',Validators.required)

  formLogin = new FormGroup({
    email:this.emailControl,
    password:this.passControl
  })
  login() {

    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched()
    }
    else{
      //this.authService.login(this.formLogin.value.email as string,this.formLogin.value.password as string)
      this.authService.loginPassport(this.formLogin.value.email as string,this.formLogin.value.password as string)
    }

  }
}
