import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/users';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ProfileServiceService } from '../../service/profile-service.service';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponentComponent {

  userdata!:Observable<User>
  userId!:string
  authUserSuscription!: Subscription
  constructor(private authService:AuthService, private profileService:ProfileServiceService){
    this.authUserSuscription=this.authService.authUser$.subscribe(
      data => { this.userId=data?._id}
    )
  }
  ngOnInit(): void {
    this.userdata = this.authService.authUser$
    //this.profileService.getProfile(this.userId)
    
  }
  ngOnDestroy(): void {
    this.authUserSuscription.unsubscribe()
  }

  logout(){
   this.authService.logout()
  }
}
