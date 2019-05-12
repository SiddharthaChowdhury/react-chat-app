export interface IUtilPersistenceAuth {
    token: string;
    issuedAt?: number;
    rememberMe: boolean;
    _id?: string;
}
export const initialAuth: IUtilPersistenceAuth = {
    token: "",
    rememberMe: false,
};