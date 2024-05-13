import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postContent:string = ''
  @Input() userId!:string
  @Input() userName!:string
  @Input() darkMode!:Observable<boolean>
  constructor(private postService:PostsService){
    
  }
  ngOnInit(): void {

    
  }
  publishPost(){
    //console.log('id: ',this.userName);
    
   this.postService.createPost(this.userId,this.postContent, this.userName)
    
  }
}
