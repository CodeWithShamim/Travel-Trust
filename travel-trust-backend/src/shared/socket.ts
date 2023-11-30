import http from 'http';
import { Server } from 'socket.io';
import app from '../app';

export const newServer = http.createServer(app);

const io = new Server(newServer, {
  cors: {},
});

io.on('connection', socket => {
  console.log('User connected:', socket.id);
});

export default io;
