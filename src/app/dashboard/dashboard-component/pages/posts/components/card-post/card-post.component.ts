import { Component, Input } from '@angular/core';
import { Post } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent {
 @Input() posts!:Observable<Post[]>
 constructor(){
 
 }
}
