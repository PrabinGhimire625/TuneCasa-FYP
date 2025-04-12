// src/context/SocketContext.js

import React, { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Create a SocketContext to manage socket connection
export const SocketContext = createContext();

// SocketProvider Component to wrap your app
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a socket connection to your backend server
    const socketConnection = io('http://localhost:3000'); // Replace with your backend URL
    setSocket(socketConnection);

    // Cleanup when the component unmounts
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
