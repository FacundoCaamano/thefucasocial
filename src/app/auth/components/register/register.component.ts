import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CreateUser } from '../../models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private authService:AuthService){

  }

  nameControl = new FormControl<string>('',Validators.required)
  emailControl = new FormControl<string >('',[Validators.required,Validators.email])
  passwordControl = new FormControl<string>('',Validators.required)
  confirmPasswordControl = new FormControl<string>('');
  
  formRegister = new FormGroup({
    name: this.nameControl,
    email:this.emailControl,
    password:this.passwordControl,
    confirmPassword: this.confirmPasswordControl
  })

  register(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched()
    }
    else{
      const password = this.passwordControl.value
      const confirmPassword = this.confirmPasswordControl.value
      
      if (password !== confirmPassword) {
        this.confirmPasswordControl.setErrors({ 'invalid': true });
        return;
      }
        const payload:CreateUser={
          name:this.nameControl.value as string,
          email:this.emailControl.value as string,
          password:this.passwordControl.value as string
        }
        this.authService.registerUser(payload.name, payload.email, payload.password)
    }
  }
}
