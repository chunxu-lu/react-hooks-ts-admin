import { IBasePagination } from "../type";

export interface IFetchListProps<Response>{
    API:(params:any)  => Promise<IBasePagination<Response>>
}