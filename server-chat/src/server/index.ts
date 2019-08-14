import express from 'express';
import http from 'http';
import cors from 'cors';

const app       = express();
export const server    = http.createServer(app);

import "./socket";

app.use(cors());
app.disable('x-powered-by');

server.listen(process.env.PORT || 1338, () => console.log(`chat-server running on port: ${process.env.PORT || 1337}`));
