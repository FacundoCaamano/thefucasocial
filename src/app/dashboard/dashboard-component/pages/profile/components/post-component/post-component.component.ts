import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Post } from '../../../home/components/posts/models';
import { PostsService } from '../../../home/components/posts/service/posts.service';
import { ThemeService } from 'src/app/core/service/theme.service';


@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.scss']
})
export class PostComponentComponent {

  userId!:string
  authUserSuscription!: Subscription
  myPosts!:Observable<Post[]>
  darkMode!:Observable<boolean>
  postIdEdit!:string | null
  originalContent!:string
  constructor(
    private authService:AuthService,
    private postService:PostsService,
    private themeService:ThemeService
  ){
    this.authUserSuscription=this.authService.authUser$.subscribe(
      data => {
        if(data){
         this.userId=data._id
           this.postService.getPostsById(data._id)
          }
      }
    )
    
    this.darkMode = this.themeService.darkMode

  }

  deletePost(postId:string){
    this.postService.deletePost(postId, this.userId)
  }

  ngOnInit(): void {
    this.myPosts = this.postService.posts$   
  }
  ngOnDestroy(): void {
    this.authUserSuscription.unsubscribe()
  }

  onEdit(postId:string, postContent:string){
    this.postIdEdit = postId
    this.originalContent = postContent
  }
  save(postId:string,postContent:string){ 
    this.postService.editPost(postId,this.userId, postContent)
    this.postIdEdit = null

  }
  cancel(post:Post){
    post.content = this.originalContent
    this.postIdEdit = null
  }
}
