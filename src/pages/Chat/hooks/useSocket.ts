import { store } from 'main/index';
import {useState, useEffect} from 'react';
import { io, Socket } from 'socket.io-client';
import { IMsg } from '../Chat';

const useSocket = () => {
  // @ts-ignore
  const access = store.getState().auth.accessToken;

  const [isConnected, setIsConnected] = useState(false);
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log('isConnected', isConnected);

  const socket = io('http://localhost:8000', {
    extraHeaders: {
      Authorization: `${access}`,
    },
  });

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
  }, []);

  useEffect(() => {
    socket.on('user join', (username: string) => {
      console.log('user join', username);
    });
  }, []);

  useEffect(() => {
    socket.on('new message', (msg: IMsg) => {
      console.log('new message', msg);
      setMsgs(preState => [...preState, msg]);
    });
  }, []);

  useEffect(() => {
    socket.on('connect to chat', (msgs: IMsg[]) => {
      setMsgs(msgs);
      setIsLoading(false);
    });
  }, []);

  const sendMsg = (
    msg: string,
    user_id: string,
    username: string,
  ) => {
    socket.emit('new message', {text: msg, owner_id: user_id, username})
  }

  return {
    msgs,
    sendMsg,
    isLoading,
    isConnected,
  };
};

export default useSocket;
