import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.state";

export const getPostState = createFeatureSelector<PostState>('posts')

export const selectPosts= createSelector(
    getPostState,
    (state:PostState) => state.posts
)