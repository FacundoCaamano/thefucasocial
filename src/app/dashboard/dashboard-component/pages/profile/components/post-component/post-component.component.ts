import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Post } from '../../../home/components/posts/models';
import { PostsService } from '../../../home/components/posts/service/posts.service';


@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.scss']
})
export class PostComponentComponent {

  userId!:string
  authUserSuscription!: Subscription
  myPosts!:Observable<Post[]>
  constructor(
    private authService:AuthService,
    private postService:PostsService,
  ){
    this.authUserSuscription=this.authService.authUser$.subscribe(
      data => {
         this.userId=data?._id
         this.postService.getPostsById(this.userId)
      }
    )
    
  }
  ngOnInit(): void {
    this.myPosts = this.postService.posts$   
  }
  ngOnDestroy(): void {
    this.authUserSuscription.unsubscribe()
  }
}
