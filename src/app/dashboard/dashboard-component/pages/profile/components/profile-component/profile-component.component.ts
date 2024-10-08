import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/users';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostsService } from '../../../home/components/posts/service/posts.service';
import { Post } from '../../../home/components/posts/models';


@Component({
  selector: 'app-profile-component',
  templateUrl: './profile-component.component.html',
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponentComponent {

  userdata!:Observable<User>
  userId!:string
  authUserSuscription!: Subscription
  myPosts!:Observable<Post[]>
  constructor(
    private authService:AuthService,
    private postService:PostsService,
  ){
    this.authUserSuscription=this.authService.authUser$.subscribe(
      data => {
        if(data){
          this.userId=data?._id}
          this.postService.getPostsById(data?._id)
        } 
    )
    
  }
  ngOnInit(): void {
    this.userdata = this.authService.authUser$ 
    this.myPosts = this.postService.posts$   
  }
  ngOnDestroy(): void {
    this.authUserSuscription.unsubscribe()
  }

  logout(){
    this.authUserSuscription.unsubscribe()
   this.authService.logout()
  }


}
