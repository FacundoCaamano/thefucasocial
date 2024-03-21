import { createAction, props } from "@ngrx/store";
import { PostState } from "./post.state";
import { Post } from "../models";


export const loadPosts = createAction(
    '[Post] Load Post'
)

export const loadPostSuccess = createAction(
    '[Post] Load post Success',
    props<{posts: Post[]}>()
)

export const loadPostFail = createAction(
    '[Post] load post failed',
    props<{error:any}>()
)

