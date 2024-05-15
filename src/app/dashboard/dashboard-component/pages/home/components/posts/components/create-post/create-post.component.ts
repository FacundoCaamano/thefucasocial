import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../service/posts.service';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postContent:string = ''
  loader!:Observable<boolean>
  @Input() userId!:string
  @Input() userName!:string
  @Input() darkMode!:Observable<boolean>
  constructor(private postService:PostsService, private loaderService:LoaderService){
    
  }
  ngOnInit(): void {
    this.loader = this.loaderService.loader$
    this.postService.postPublished$.subscribe((data)=>this.postContent = data)
  }
  publishPost(){
   this.postService.createPost(this.userId,this.postContent, this.userName)
}
}
