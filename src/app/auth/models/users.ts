
export interface CreateUser{
    name: string,
    email:string,
    password: string,
}

export interface User{
    _id:string,
    name: string,
    email:string,
    createdAt:Date
}
