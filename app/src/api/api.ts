import {host, Methods, TypeAPI} from "./apiInfo";

export enum ApiName {
    GetUsers = "GetUsers",
    GetCompanyUsers = "GetCompanyUsers"
}

export const API: TypeAPI = {
    [ApiName.GetUsers]: {method: Methods.GET, url: host + '/users'},
    [ApiName.GetCompanyUsers]: {method: Methods.GET, url: host + '/users/'},
};