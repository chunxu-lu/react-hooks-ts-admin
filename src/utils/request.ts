import { message } from 'antd'
import axios, { AxiosResponse } from 'axios'
import { IBaseReponse } from '../type'

axios.interceptors.response.use((response:AxiosResponse<IBaseReponse<any>>) => {
    // if(response.data.code !== 1000){
    //     message.error(response.data.message)
    //     throw new Error
    // }
    // console.log(response.data);
    // console.log(response.data.data);
    
    return response.data.data
})

axios.interceptors.request.use((config) => {
    if(config.headers){
        const globalLocal = JSON.parse(localStorage.getItem('global') || "{}")
        config.headers['Authorization'] = globalLocal.token
    }
    return config
})

export default axios