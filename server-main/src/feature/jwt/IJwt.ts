export interface IJwtPayload {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    companyName: string;
    companyId: number;
    avatar?: string;
    // add more when required
}

export interface IJwtTokenDecode extends IJwtPayload {
    userId: string;
    createdAt: string;
}