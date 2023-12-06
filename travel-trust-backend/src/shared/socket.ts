/* eslint-disable @typescript-eslint/no-explicit-any */
import http from 'http';
import { Server, Socket } from 'socket.io';
import app from '../app';
import prisma from './prisma';
import { Message } from '@prisma/client';

export const newServer = http.createServer(app);

const io = new Server(newServer, {
  cors: {
    origin: '*',
  },
});

export const connectedUsers: Record<string, string> = {};

io.on('connection', (socket: Socket) => {
  console.log('User connected:', socket.id);

  // join user wth their socket id
  socket.on('join', (userId: string) => {
    connectedUsers[userId] = socket.id;
  });

  socket.on('message', async (data: Message) => {
    const receiverId = data?.receiverId;

    if (receiverId && connectedUsers[receiverId]) {
      io.to(connectedUsers[receiverId]).emit('message', data);
    }

    // save the message to the database
    await prisma.message.create({
      data,
    });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    const userId: any = Object.keys(connectedUsers).find(
      key => connectedUsers[key] === socket.id
    );

    delete connectedUsers[userId];
  });
});

export default io;
