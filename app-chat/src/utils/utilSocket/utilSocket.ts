import io from 'socket.io-client';
import socketOn from "./socketOn";

const server = `http://localhost:1338`;
export class UtilSocket {
    public conn = io(server);
    constructor (){
        this.conn.on('connect', this.onConnect);
        this.conn.on('disconnect', this.onDisconnect);
    }

    private onConnect = () => {
        console.log('conn established');
        socketOn()
    };

    private onDisconnect = () => {
        console.log('conn disconnected')
    };

    public initiate = () => {
        console.log('initiated socket connection')
    }
}

export const socket = new UtilSocket();