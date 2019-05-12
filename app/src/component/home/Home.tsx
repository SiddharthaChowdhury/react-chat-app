import * as React from "react";
import OnlineUsers from "./onlineUsers/OnlineUsers";
import {ChatWindow} from "./chatWindow/ChatWindow";
import { Container, Row, Col } from 'reactstrap';
import Friends from "./friends/Friends";

export const Home: React.FC = () => (
    <Container>
        <Row>
            <Col>
                <OnlineUsers/>
                <hr/>
                <Friends/>
            </Col>
            <Col><ChatWindow/></Col>
            <Col>{'No assets yet'}</Col>
        </Row>
    </Container>
);
