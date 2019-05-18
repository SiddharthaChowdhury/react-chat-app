import * as React from "react";
import OnlineUsers from "./onlineUsers/OnlineUsers";
import {ChatWindow} from "./chatWindow/ChatWindow";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Chat, Face, Group, PhotoLibrary, Settings, Web} from "@material-ui/icons";
import {Grid} from "@material-ui/core";


export const Home: React.FC = () => (
    <Grid container direction="column" alignItems="center" justify="center">
        <AppBar position="static">
            <Toolbar className={'center'}>
                <Button color="inherit"> <Web/> &nbsp; Status</Button>
                <Button color="inherit"> <Chat/> &nbsp; Chats</Button>
                <Button color="inherit"> <Face/> &nbsp; Friends</Button>
                <Button color="inherit"> <Group/> &nbsp; Groups</Button>
                <Button color="inherit"> <PhotoLibrary/> &nbsp; Assets</Button>
                <Button color="inherit"> <Settings/> &nbsp; Settings</Button>
            </Toolbar>
        </AppBar>
        <div>
            <div>
                <OnlineUsers/>
                <hr/>
                <Face/>
            </div>
            <div><ChatWindow/></div>
            <div>{'No assets yet'}</div>
        </div>
    </Grid>
);
