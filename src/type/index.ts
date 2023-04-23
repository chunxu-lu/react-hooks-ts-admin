import exp from 'constants'
import { AnyAction } from 'redux'

export interface IBaseReponse<T>{
    code:number
    message:string
    data:T
}

export enum Role {
    USERMANAGE = 'userManage',
    ACTIVITYMANAGE = 'activityManage'
}

export interface IPayload<T extends Partial<AnyAction>>{
    payload:T
} 

export interface IBasePagination<T>{
    list:T[],
    pagination:{
        size:number,
        page:number,
        total:number
    }
}

export class BaseParamsParams{
    public page = 1
    public size = 3
}