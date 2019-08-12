import express from 'express';

export const router = express.Router();

router.get('/', (req: any, res: any) => {
    res.send('hello');

    // now broadcast the updated foo..
    req.io.sockets.emit('update', 'stuff');
});