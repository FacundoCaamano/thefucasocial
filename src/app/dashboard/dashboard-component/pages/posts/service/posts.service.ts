import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url = environment.urlApi

  constructor(private httpClient:HttpClient) { }

  getPosts():Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.url + 'posts')
  }
}
