import io from 'socket.io-client';
import {IdSocketVerb} from "../types/Types";


const server = `http://localhost:1337`;
export class Socket {
    public socket$: any;
    constructor (){
        this.socket$ = io(server);
        this.socket$.on(IdSocketVerb.connect, this.onConnect);
        this.socket$.on(IdSocketVerb.disconnect, this.onDisconnect);
    }

    private onConnect = () => {
        console.log('connection established')
    };

    private onDisconnect = () => {
        console.log('connection disconnected')
    };
}