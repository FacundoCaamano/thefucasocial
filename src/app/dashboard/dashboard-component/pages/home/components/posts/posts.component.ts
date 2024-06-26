import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from './models';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostsService } from './service/posts.service';
import { ThemeService } from 'src/app/core/service/theme.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$!: Observable<Post[] | []> 
  userId!:string
  userName!:string
  suscription!:Subscription
  darkMode!:Observable<boolean>
  constructor(private authService:AuthService, private postService:PostsService, private themeService:ThemeService){
    this.postService.getPosts()
    this.darkMode = this.themeService.darkMode
    this.suscription = this.authService.authUser$.subscribe(
       data => {
         this.userId = data?._id  
         this.userName = data?.name
        }
      )
    }
  ngOnInit(): void {
    this.posts$ = this.postService.posts$
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe()
  }

}
