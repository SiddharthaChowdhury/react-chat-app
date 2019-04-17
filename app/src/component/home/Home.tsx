import * as React from "react";
import OnlineUsers from "./onlineUsers/OnlineUsers";
import {ChatWindow} from "./chatWindow/ChatWindow";

export const Home: React.FC = () => (
    <div>
        <OnlineUsers/>
        <ChatWindow/>
    </div>
);
