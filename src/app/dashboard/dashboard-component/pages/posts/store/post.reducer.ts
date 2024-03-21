import { createReducer, on } from "@ngrx/store";
import { initialState, PostState } from "./post.state";
import { loadPostFail, loadPostSuccess, loadPosts } from "./post.actions";

export const postReducer = createReducer(
    initialState,
    on(loadPosts, state => ({
        ...state
    })),

    on(loadPostSuccess,(state, {posts})=>({
        ...state,
        posts: posts
    })),

    on(loadPostFail, (state, {error})=>({
        ...state,
    }) )
)