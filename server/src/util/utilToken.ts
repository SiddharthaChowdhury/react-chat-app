class UtilToken {
    public generateToken = (tokenPayload: any) => {
        return tokenPayload;
    };

    public extractToken = (token: string): any => {
        return JSON.parse(token)
    }
}

export const utilToken = new UtilToken();