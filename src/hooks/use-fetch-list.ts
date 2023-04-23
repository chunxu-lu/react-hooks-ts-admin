import { useEffect, useState } from "react";
import { BaseParamsParams } from "../type";
import { IFetchListProps } from "./type";

export default function useFetchList<Response>(props:IFetchListProps<Response>) {
    const [dataSource,setDataSource] = useState<Response[]>([])
    const [total,setTotal] = useState(0)
    const [filterParams,setFilterParams] = useState(new BaseParamsParams())

    useEffect(()=>{
        getData()
    },[filterParams])

    const getData = async() => {
       const {list, pagination} = await props.API(filterParams)
       setDataSource(list)
       setTotal(pagination.total)
    }

    return{
        dataSource,
        total
    }
}