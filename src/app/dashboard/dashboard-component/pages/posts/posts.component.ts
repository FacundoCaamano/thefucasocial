import { Component, OnInit } from '@angular/core';
import { PostState } from './store/post.state';
import { Store, select } from '@ngrx/store';
import { loadPosts } from './store/post.actions';
import { Observable } from 'rxjs';
import { Post } from './models';
import { selectPosts } from './store/post.selector';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]> 
  constructor(private store: Store<PostState>){

  }
  ngOnInit(): void {
    this.store.dispatch(loadPosts())
    this.posts$ = this.store.select(selectPosts)
  }

}
