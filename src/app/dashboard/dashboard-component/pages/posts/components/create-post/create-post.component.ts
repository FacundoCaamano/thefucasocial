import { Component } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  postContent:string = ''
  userId!:string
  userName!:string
  constructor(private postService:PostsService, private authservice:AuthService){
     this.authservice.authUser$.subscribe(
      data =>{
        if(data){
          this.userId = data?._id
          this.userName = data?.name
        }
      }
     )

  }
  publishPost(){
    //console.log('id: ',this.userName);
    
   this.postService.createPost(this.userId,this.postContent, this.userName)
    
  }
}
