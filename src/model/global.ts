import { Model, routerRedux } from "dva";
import { ILoginResponse } from "../pages/login/login.type";
import { IPayload } from "../type";

export default{

    namespace:'global',

    state:{
        roles:[],
        token:''
    },

    effects:{
        *setUserInfo({payload}:Partial<IPayload<ILoginResponse>>,{ put }){
            console.log('payload',payload);
            yield put({
                type:'save',
                payload,
            })

            yield put(routerRedux.push('/activityManage'))
        }
    },

    reducers:{
        save(state,action:Partial<IPayload<any>>){
            return {...state,...action.payload}
        }
    },

    subscriptions:{
        setup({history}){
            history.listen((router) => {
                const global = JSON.parse(localStorage.getItem('global') || '{}')
                const ignoreUrls = ['/login']
                if(!global.token && !ignoreUrls.includes(router.pathname)){
                    history.push('/login')
                }
            })
        }
    }

} as Model