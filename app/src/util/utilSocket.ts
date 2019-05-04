import io from 'socket.io-client';
import {IdSocketVerb} from "../types/Types";


const server = `http://localhost:1337`;
export class UtilSocket {
    public conn = io(server);
    constructor (){
        this.conn.on(IdSocketVerb.connect, this.onConnect);
        this.conn.on(IdSocketVerb.disconnect, this.onDisconnect);
    }

    private onConnect = () => {
        console.log('conn established')
    };

    private onDisconnect = () => {
        console.log('conn disconnected')
    };
}

export const socket = new UtilSocket();