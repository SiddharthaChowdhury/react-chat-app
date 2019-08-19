import {Socket} from "socket.io";

export interface ISocketUsers {
    [index: number]: Socket
}
export interface ISocketMap {
    [index: number]: ISocketUsers
}
