import { store } from 'main/index';
import {useState, useEffect} from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = () => {
  // @ts-ignore
  const access = store.getState().auth.accessToken;

  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [msgs, setMsgs] = useState([]);

  console.log('isConnected', isConnected);

  useEffect(() => {
    const _socket = io('http://localhost:8000', {
      extraHeaders: {
        Authorization: `${access}`,
      },
    });

    setSocket(_socket);

    _socket.on("connect", () => setIsConnected(true));
    _socket.on("disconnect", () => setIsConnected(false));
  
    _socket.on('connect_error', (err: any) => {
      console.log(err.message);
    });
  
    _socket.on('new message', (msg: any) => {
      console.log('msg', msg)
    });
  
    _socket.on('user join', (username: string) => {
      console.log('user join', username);
    });
  }, []);

  const joinUser = (username: string) => {
    if (socket && isConnected) {
      socket.emit('new user', username);
    }
  };

  const sendMsg = (msg: string) => {
    // socket.emit('new message', JSON.stringify({text: msg}));
  };

  return {
    sendMsg,
    joinUser,
    isConnected,
  };
};

export default useSocket;
