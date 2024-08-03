import React, { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => {
    const socketInstance = io("http://localhost:8000");
    
    socketInstance.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });
    
    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    return socketInstance;
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
