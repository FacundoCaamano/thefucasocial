import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostsService } from '../../service/posts.service';
import { ThemeService } from 'src/app/core/service/theme.service';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent implements OnInit{
 @Input() posts!:Observable<Post[]>
 @Input() userId!: string 
 @Input() darkMode!:Observable<boolean>
 
  loader!:Observable<boolean>

 constructor(
  private authService:AuthService,
  private postService:PostsService, 
  private loaderService:LoaderService){

  }

  
  ngOnInit(): void {
    this.loader = this.loaderService.loader$
  }



like(postId:string){
  this.postService.likePost(postId, this.userId)
 }
 dislike(postId:string){
  this.postService.dislikePost(postId, this.userId)
 }
 onDelete(postId:string){
  console.log('post eliminado , id:', postId,this.userId );
  this.postService.deletePost(postId,this.userId)
 }
}
