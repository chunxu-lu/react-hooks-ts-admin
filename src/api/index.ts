import { IActivity, IActivityParams } from '../pages/activityManage/activityManage.type'
import { ILoginParams, ILoginResponse } from '../pages/login/login.type'
import { IBasePagination } from '../type'
import request from './../utils/request'

export default {
    login(data:ILoginParams){
       return request.post<ILoginParams,ILoginResponse>('loginwithpassword',data)
    },
    getAct(data:IActivityParams){
        return request.post<IActivityParams,IBasePagination<IActivity>>('actlist',data)
    }
}