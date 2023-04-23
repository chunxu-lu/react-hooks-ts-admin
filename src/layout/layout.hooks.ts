import { useSelector } from "dva"
import { useEffect, useState } from "react"
import { IGlobalState } from "../model/type"
import { menus } from "./layout.config"
import { IMenu } from "./layout.type"

export default function useLayout(){

    const [currentMenus,setCurrentMenus] = useState<IMenu[]>([])

    const global = useSelector<{global:IGlobalState},IGlobalState>(({global}) => global)

    useEffect(()=>{
        setCurrentMenus(getCurrentMenus())
    },[])

    const getCurrentMenus = (menuArr = menus) => {
        return menuArr.filter((item) => {
            if(item.children){
                item.children = getCurrentMenus(item.children)
            }
            
            return item.roles.some((val) => global.roles.includes(val as never))
        })
    }

    return {
        currentMenus
    }
}