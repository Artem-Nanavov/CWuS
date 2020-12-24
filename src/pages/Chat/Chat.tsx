import axios from 'axios';
import { fetches } from 'main';
import React, { useEffect } from 'react';
import {io} from 'socket.io-client';

interface IChat {
  access: string | null;
}

const Chat = ({
  access,
}: IChat) => {
  useEffect(() => {
    fetches().fetchUser.get('me');
  }, []);

  const socket = io('http://localhost:8000', {
    extraHeaders: {
      Authorization: `${access}`,
    },
  });

  socket.on("connect_error", (err: any) => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });

  return (
    <div></div>
  );
};

export default Chat;
