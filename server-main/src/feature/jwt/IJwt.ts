export interface IJwtPayload {
    userId: string;
    email: string;
    // add more when required
}

export interface IJwtTokenDecode extends IJwtPayload {
    userId: string;
    createdAt: string;
}