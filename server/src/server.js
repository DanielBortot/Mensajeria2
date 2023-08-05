import express from 'express';
import {Server as SocketServer} from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

export {app};
export {server};
export {io}
