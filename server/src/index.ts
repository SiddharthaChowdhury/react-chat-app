import express from 'express';
import http from 'http';
import socket, {Socket} from 'socket.io';
import cors from 'cors';
import { IdSocketKey } from './socket/infoSocket';
import users from './temp/users';
import { IUserInfo } from './types/IUser';

const app = express();
const PORT = 8002;
const server = http.createServer(app);
const io = socket(server);

const clients: any = {};

io.on(IdSocketKey.connection, (client: any) => {
    client.on(IdSocketKey.signIn, (userInfo: IUserInfo) => {
        const user_id = userInfo.id;
        const company_id = userInfo.companyId;

        if (!user_id || !company_id) return;

        client['myId'] = {id: user_id, companyId: userInfo.companyId};

        if(!clients[company_id]) {
            clients[company_id] = {}
        }

        if (clients[company_id][user_id]) {
            clients[company_id][user_id].push(client);
        } else {
            clients[company_id][user_id] = [client];
        }
        // Join default chatRoom
        const defaultRoomName = 'channel'+company_id;
        client.join(defaultRoomName);

        // Announce new user connected
        const onlineUserIdList = Object.keys(clients[company_id]);
        for(let user in clients[company_id]) {
            clients[company_id][user].forEach((clientSession: any) => {
                clientSession.emit(IdSocketKey.onlineUsers, onlineUserIdList)
            })
        }
    });

    client.on('error', (error: any) => {
        console.log("ERROR!!", error)
    });

    client.on('disconnecting', (reason: any) => {
        // console.log("DISCONNECTING, ", reason)
    });

    client.on(IdSocketKey.channelBroadcast, (payload: any) => {
        // console.log('CHANNEL BROADCAST', io.sockets.adapter.rooms[payload.channelId]);
        // io.sockets.adapter.rooms[payload.channelId].length {to get how many in the room live}
        if(!!io.sockets.adapter.rooms[payload.channelId]) {
            io.to(payload.channelId).emit(IdSocketKey.channelBroadcast, payload);
        }
    });

    client.on(IdSocketKey.message, (msg: any)=> {
        console.log('connections', Object.keys(clients));
        const targetId = msg.toId;
        const sourceId = client['myId'].id;
        const companyId = client['myId'].companyId;

        
        if(targetId && clients[companyId][targetId]) {

            clients[companyId][targetId].forEach((cli: any) => {
                cli.emit(IdSocketKey.message, {...msg, selfEcho: false});
            });
        }

        if(sourceId === targetId) {
            return;
        }
    
        if(sourceId && clients[companyId][sourceId]) {
            // Echo back
            clients[companyId][sourceId].forEach((cli: any) => {
                cli.emit(IdSocketKey.message, {...msg, selfEcho: true});
            });

        }
    });
    
    client.on(IdSocketKey.disconnect, function() {
        if (!client['myId'] ) {
          return;
        }

        const user_id = client['myId'].id;
        const company_id = client['myId'].companyId;

        // Leave chat rooms
        const defaultRoomName = 'channel'+company_id;
        client.leave(defaultRoomName);

        // Remove from clients object
        if (!clients[company_id] || !clients[company_id][user_id]) {
            return
        }

        let targetClients = clients[company_id][user_id];
        
        for (let i = 0; i < targetClients.length; ++i) {
          if (targetClients[i] == client) {
            targetClients.splice(i, 1);
          }
        }

        if(targetClients.length === 0) {
            delete clients[company_id][user_id]
        }

        if(Object.keys(clients[company_id]).length === 0){
            delete clients[company_id]
        }

        if(clients[company_id]) {
            // Announce new user connected
            const onlineUserIdList = Object.keys(clients[company_id]);
            for(let user in clients[company_id]) {
                clients[company_id][user].forEach((clientSession: any) => {
                    clientSession.emit(IdSocketKey.onlineUsers, onlineUserIdList)
                })
            }
        }
    });
});

app.use(cors());
app.get("/users", (req, res) => { 
    res.send({ data: users });
});

app.get("/users/:id", (req, res) => {
  const companyId = req.params.id;
  res.send({ data: users.filter((user: IUserInfo) => user.companyId === companyId) });
});

server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
