import { BaseParamsParams } from "../../type";

export interface IActivity{
    activityName:string,
    activityImg:string,
    activityStatus:string,
    address:string,
    business:string
}

export interface IActivityParams extends BaseParamsParams{
    activityStatus:string,
    activityName:string
}