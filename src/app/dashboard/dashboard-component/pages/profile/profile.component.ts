import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/auth/models/users';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostsService } from '../home/components/posts/service/posts.service';
import { Post } from '../home/components/posts/models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy  {
  userdata!:Observable<User>
  userId!:string
  authUserSuscription!: Subscription
  myPosts!:Observable<Post[]>
  constructor(
    private authService:AuthService,
    private postService:PostsService,
  ){
    this.authUserSuscription=this.authService.authUser$.subscribe(
      data => { this.userId=data?._id}
    )
    
  }
  ngOnInit(): void {
    this.postService.getPostsById(this.userId)
    this.userdata = this.authService.authUser$ 
    this.myPosts = this.postService.posts$   
  }
  ngOnDestroy(): void {
    this.authUserSuscription.unsubscribe()
  }
  
} 
