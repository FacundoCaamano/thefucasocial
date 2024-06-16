import { Component, Input, OnInit } from '@angular/core';
import { trigger,state, style, animate,transition,} from '@angular/animations';
import { Post } from '../../models';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PostsService } from '../../service/posts.service';
import { ThemeService } from 'src/app/core/service/theme.service';
import { LoaderService } from 'src/app/core/service/loader.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  animations: [
    trigger('toggleComments', [
      state('void', style({
        height: '0px',
        padding: '0px'
      })),
      state('*', style({
        height: '*',
        padding: '*'
      })),
      transition('void <=> *', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class CardPostComponent implements OnInit {
  @Input() posts!: Observable<Post[]>
  @Input() userId!: string
  @Input() darkMode!: Observable<boolean>
  selectPost: string | null = null
  editingPost!: string | null
  originalContent!: string
  loader!: Observable<boolean>
  isOpen = true;

  constructor(
    private authService: AuthService,
    private postService: PostsService,
    private loaderService: LoaderService) {
      
    }
    toggle() {
      this.isOpen = !this.isOpen;
    }


  ngOnInit(): void {
    this.loader = this.loaderService.loader$
  }



  like(postId: string) {
    this.postService.likePost(postId, this.userId)
  }
  dislike(postId: string) {
    this.postService.dislikePost(postId, this.userId)
  }
  onDelete(postId: string) {
    console.log('post eliminado , id:', postId, this.userId);
    this.postService.deletePost(postId, this.userId)
  }
  onEdit(postId: string, postContent: string) {
    this.editingPost = postId
    this.originalContent = postContent
  }

  save(postId: string, postContent: string) {
    this.postService.editPost(postId, this.userId, postContent)
    this.editingPost = null
  }
  cancel(post: Post) {
    post.content = this.originalContent
    this.editingPost = null
  }

  selectPostComment(postId: string) {
    if (this.selectPost == postId) {
      this.selectPost = null
    }
    else {
      this.selectPost = postId
    }
  }
}
