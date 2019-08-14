import express from 'express';
import http from 'http';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import helmet from 'helmet';
import socket from './socket';

const app               = express();
export const server     = http.createServer(app);

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');
socket.connect();

app.listen(process.env.PORT || 1338, () => console.log(`socket-server listening on port: ${process.env.PORT}`))


