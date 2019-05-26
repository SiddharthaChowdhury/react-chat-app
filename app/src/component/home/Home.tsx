import * as React from "react";
import {ChatWindow} from "./chatWindow/ChatWindow";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Chat, Face, PhotoLibrary, Settings} from "@material-ui/icons";
import './home.scss';
import {SideBar} from "./sideBar/SideBar";
import {Grid} from "@material-ui/core";

export const Home: React.FC = () => {
    return (
        <Grid container id={"homeContainer"}>
            <Grid item md={10} className={"viewport"}>
                <AppBar position="static">
                    <Toolbar className={'center'}>
                        {/*<Button color="inherit"> <Web/> &nbsp; Status</Button>*/}
                        <Button color="inherit"> <Chat/> &nbsp; Chats</Button>
                        {/*<Button color="inherit"> <Face/> &nbsp; Friends</Button>*/}
                        {/*<Button color="inherit"> <Group/> &nbsp; Groups</Button>*/}
                        <Button color="inherit"> <PhotoLibrary/> &nbsp; Assets</Button>
                        <Button color="inherit"> <Settings/> &nbsp; Settings</Button>
                    </Toolbar>
                </AppBar>
                <Grid container className={"appContentWrapper"}>
                    <Grid item className={"sideBar"} md={3}>
                        <SideBar/>
                    </Grid>
                    <Grid item className={"appContent"} md={6}>
                        <ChatWindow/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}


