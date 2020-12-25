import { fetches } from 'main';
import React, { useEffect, useState } from 'react';
import useSocket from './hooks/useSocket';
import styles from './chat.scss';
import TextField from '@material-ui/core/TextField';
import { io, Socket } from 'socket.io-client';
import Msg from './components/msg/Msg';

interface IChat {
  user_id: string | null;
  access: string | null;
  isAuth: boolean;
  username: string | null;

  setUserData: (id: string, username: string) => void;
  initSocketSaga: () => void;

  isConnected: any
  _socket: Socket | null;
}

interface IMsg {
  owner_id: string;
  date: Date;
  username: string;
  text: string;
  msg_id: string;
}

const Chat = ({
  access,
  isAuth,
  user_id,
  initSocketSaga,
  setUserData,
  username,
  _socket,
  isConnected,
}: IChat) => {
  useEffect(() => {
    fetches().fetchUser.get('me')
      .then(res => setUserData(res.data._id, res.data.username));
  }, []);

  const [msg, setMsg] = useState('');
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const [loader, setLoader] = useState(true);

  const socket = io('http://localhost:8000', {
    extraHeaders: {
      Authorization: `${access}`,
    },
  });

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
      setLoader(false);
    });
  }, []);

  const sendMsgHandler = (e: any) => {
    if (e.key === 'Enter' && msg.trim().length > 0) {
      socket.emit('new message', {text: msg, owner_id: user_id, username})
      setMsg('');
    }
  };

  useEffect(() => {
    const elem = document.getElementById('chat-content');

    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [msgs]);

  if (loader) {
    return (
      <div>...loading</div>
    )
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBody} id="chat-content">
        {
          msgs.map(msg => (
            <Msg
              key={msg.msg_id}
              user_id={user_id as string}
              owner_id={msg.owner_id}
              username={msg.username}
              date={msg.date}
              text={msg.text}
            />
          ))
        }
      </div>

      <div className={styles.chatMsg}>
        <TextField
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={sendMsgHandler}
          fullWidth
          id="msg-input"
          label="Сообщеие"
          size="small"
          variant="outlined"
        />
      </div>
    </div>
  );
};

export default Chat;
