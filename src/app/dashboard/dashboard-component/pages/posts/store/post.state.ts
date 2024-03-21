import { Post } from "../models";

export interface PostState {
    posts: Post[];
}

export const initialState:PostState = {
    posts:[]
}