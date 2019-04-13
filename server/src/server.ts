import express from 'express';
import http from 'http';
import io from 'socket.io';
import cors from 'cors';

const app       = express();
const server    = http.createServer(app);

app.use(cors());

server.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`));
