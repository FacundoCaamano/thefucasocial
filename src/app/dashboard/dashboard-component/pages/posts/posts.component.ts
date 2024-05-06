import { Component, OnInit } from '@angular/core';
import { PostState } from './store/post.state';
import { Store, select } from '@ngrx/store';
import { loadPosts } from './store/post.actions';
import { Observable } from 'rxjs';
import { Post } from './models';
import { selectPosts } from './store/post.selector';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]> 
  userId!:string
  userName!:string
  constructor(private store: Store<PostState>, private authService:AuthService){
     this.authService.authUser$.subscribe(
       data => {
         this.userId = data?._id  
         this.userName = data?.name
        }
      )
    }
  ngOnInit(): void {
    this.store.dispatch(loadPosts())
    this.posts$ = this.store.select(selectPosts)
  }

}
