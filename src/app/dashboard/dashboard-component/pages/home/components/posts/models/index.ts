export interface Post{
    _id:string,
    content:string,
    authorId: string,
    authorName:string,
    createdAt:Date,
    likes:Array<string>,
    dislikes:Array<string>,
    edit:boolean
}