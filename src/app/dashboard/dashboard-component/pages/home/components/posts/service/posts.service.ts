import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, mergeMap, take } from 'rxjs';
import { Post } from '../models';
import { environment } from 'src/environments/environment.development';
import { LoaderService } from 'src/app/core/service/loader.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url = environment.urlApi

  private _postPublished$ = new Subject<string>();
  public postPublished$ = this._postPublished$.asObservable();
  
  private _posts$ = new BehaviorSubject<Post[]>([])
  public posts$ = this._posts$.asObservable()



  constructor(private httpClient: HttpClient, private loaderService:LoaderService) { }

  getPosts() {
    this.loaderService.setLoader(true)
    this.httpClient.get<Post[]>(this.url + 'posts').subscribe(
      {
      next: (data) => {   
        this._posts$.next(data)
      },
      error: (err) => {
        this.loaderService.setLoader(false)
      },
      complete: () => {
        this.loaderService.setLoader(false)
      }
    })
  }

  createPost(_id: string, content: string, authorName: string){
    this.loaderService.setLoader(true)
    this.httpClient.post(this.url + '/create-post/' + _id, { content, authorName },{withCredentials:true})
      .pipe(
        mergeMap((posts) => this._posts$.pipe(take(1),
        map(
          (arrayActual) => [ posts,...arrayActual,])
        )
      ))
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            this._posts$.next(data as Post[])
            this._postPublished$.next('')
          },
          error: (error) => {
            this.loaderService.setLoader(false)
            console.log('error al publicar', error);
          },
          complete: () => {
              this.loaderService.setLoader(false)
          }
        }
      )    
  }
  likePost(postId: string, userId: string) {
    this.httpClient.post(this.url + 'like/' + postId + '/' + userId, {})
    .pipe(
      mergeMap(() => this._posts$.pipe(take(1),
        map(posts =>{
          return posts.map(post =>{
            if(post._id === postId){
              const dislikes = post.dislikes.filter(dislikeId => dislikeId !== userId);
              return { ...post, likes: [...post.likes, userId], dislikes };
            }else{
              return post
            }
          })
        })
      ))
    )
    .subscribe({
      next: (updatedPost) => {
        console.log(updatedPost);
        
        this._posts$.next(updatedPost)

      },
      error: () => {
        console.log('error');

      },
      complete: () => {
        console.log('complete');

      }
    })
  }
  dislikePost(postId: string, userId: string) {
    this.httpClient.post(this.url + 'dislike/' + postId + '/' + userId, {})
    .pipe(
      mergeMap(() => this._posts$.pipe(take(1),
        map(posts =>{
          return posts.map(post =>{
            if(post._id === postId){ 
              const likes = post.likes.filter(likes => likes !== userId)
              return {...post, dislikes:[...post.dislikes, userId],likes}
            }else{
              return post
            }
          })
        })
      ))
    )
    .subscribe({
      next: (updatedPost) => {
        console.log(updatedPost);
        
        this._posts$.next(updatedPost)

      },
      error: () => {
        console.log('error');

      },
      complete: () => {
        console.log('complete');

      }
    })
  }

  deletePost(postId: string, userId: string) {
    this.httpClient.delete(this.url + 'delete-post/' + postId + '/' + userId,{withCredentials:true})
    .pipe(mergeMap((responsePostDelete)=> this._posts$.pipe(
      take(1),
      map((arrayActual)=> arrayActual.filter(p => p._id !== postId))
    )))
    .subscribe({
      next:(posts)=>{
        this._posts$.next(posts)
      },
      error:(data)=>{
        console.log(data);
        
      }
    })
  }

  getPostsById(id:string){
    this.httpClient.get(this.url + 'postsbyid/' + id).subscribe(
      {
        next:(data)=>{  
          this._posts$.next(data as Post[])
        }
      }
    )
  }

  editPost(postId:string, userId:string,content:string){
    this.loaderService.setLoader(true);
    this.httpClient.put(this.url + 'edit-post/'+ postId + '/' + userId,{content},{withCredentials:true})
    .pipe(mergeMap(() => this._posts$.pipe(
      take(1),
      map(posts => {
        return posts.map(post => {
          if(post._id === postId){
            return {...post, content, edit:true}
          }else{
            return post
          }
        })
      })
    )))
    .subscribe({
      next:(updatedPost)=>{
        this._posts$.next(updatedPost);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log('edit completado');
        this.loaderService.setLoader(false)
      }
    })
  }
}
