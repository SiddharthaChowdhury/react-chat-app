import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { IJwtPayload } from './IJwt';

const private_key   = fs.readFileSync(path.resolve(__dirname, './private.key'), 'utf8');
const public_key    = fs.readFileSync(path.resolve(__dirname, './private.key'), 'utf8');

const sign = (payload: any) => {
    return jsonwebtoken.sign({...payload, createdAt: new Date().toISOString()}, private_key);
}

const verify = (token: string) => {
    try {
        return jsonwebtoken.verify(token, public_key)
    } catch (err) {
        return false;
    }
    
}

export const jwt = {
    sign,
    verify
}