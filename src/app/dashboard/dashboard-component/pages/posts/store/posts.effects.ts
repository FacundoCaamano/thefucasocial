import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostsService } from "../service/posts.service";
import { loadPostFail, loadPostSuccess, loadPosts } from "./post.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()

export class PostsEffects{

    loadPosts$ = createEffect(()=>
    this.actions$.pipe(
        ofType(loadPosts),
        switchMap(()=>
        this.postService.getPosts().pipe(
            map(posts => loadPostSuccess({posts})),
            catchError(error => of(loadPostFail({error})))
        )
        )
    )
    )

    constructor(
        private actions$:Actions,
        private postService:PostsService
    ){}
}