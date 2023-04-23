export interface ILoginParams{
    username:string,
    password:string
}

export interface ILoginResponse{
    token:string,
    roles:[]
}