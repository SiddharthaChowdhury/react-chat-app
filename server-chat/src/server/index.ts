import express from 'express';
import http from 'http';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import {conn} from "./connection";
import socket from './socket';
import {router} from "./routes";
import {INext, IRequest, IResponse} from "./IServer";

const app               = express();
export const server     = http.createServer(app);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');
socket.connect();
app.use((req: IRequest, res: IResponse, next: INext) => {
    req.io = socket.io;
    next();
});
app.use('/', router);

conn.connect((err: Error) => {
    if(err) throw err;

    console.log('Database connected!');
    app.listen(process.env.PORT || 1338, () => console.log(`main-server listening on port: ${process.env.PORT}`))
});

