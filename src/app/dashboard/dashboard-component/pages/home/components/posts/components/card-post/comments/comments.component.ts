import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../../service/posts.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postId!: string

  comments!: Observable<any[]>
  inputCommentValue: string = ''

  loader!: Observable<boolean>

  authorName: string | null
  authorId: string | null
  constructor(private postService: PostsService, private authService: AuthService) {
    this.authorName = this.authService.authUserName,
      this.authorId = this.authService.authUserId
  }
  ngOnInit(): void {
    this.loader = this.postService.loader$
    this.postService.getComments(this.postId)
    this.comments = this.postService.comments$
  }
  sendComment() {
    this.postService.createComment(this.inputCommentValue, this.postId, this.authorId as string, this.authorName as string)
    this.inputCommentValue = ''
  }

  likeComment(commentId: string) {
    this.postService.likeComment(commentId, this.authorId as string)
  }
  dislikeComment(commentId: string) {
    this.postService.dislikeComment(commentId, this.authorId as string)
  }
  deleteMyComment(commentId: string) {
    this.postService.deleteComment(commentId, this.authorId as string)
  }
}
