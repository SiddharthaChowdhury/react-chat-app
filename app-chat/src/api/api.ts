import {host, Methods, TypeAPI} from "./apiInfo";

export enum ApiName {
    Login = "Login",
    Authenticate = "Authenticate",
    AddUser = "AddUser",
    GetUsers = "GetUsers"
}

export const API: TypeAPI = {
    [ApiName.Login]: {method: Methods.POST, url: host + '/login'},
    [ApiName.Authenticate]: {method: Methods.POST, url: host + '/verify-token'},
    [ApiName.AddUser]: {method: Methods.POST, url: host + '/add-user'},
    [ApiName.GetUsers]: {method: Methods.GET, url: host + '/get-company-users'},
};

