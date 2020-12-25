import { fetches } from 'main';
import React, { useEffect, useState } from 'react';
import useSocket from './hooks/useSocket';
import styles from './chat.scss';
import TextField from '@material-ui/core/TextField';
import { io, Socket } from 'socket.io-client';
import Msg from './components/msg/Msg';

interface IChat {
  user_id: string | null;
  username: string | null;

  setUserData: (id: string, username: string) => void;
}

export interface IMsg {
  owner_id: string;
  date: Date;
  username: string;
  text: string;
  msg_id: string;
}

const Chat = ({
  user_id,
  setUserData,
  username,
}: IChat) => {
  useEffect(() => {
    fetches().fetchUser.get('me')
      .then(res => setUserData(res.data._id, res.data.username));
  }, []);

  const {
    msgs,
    sendMsg,
    isLoading,
  } = useSocket();

  const [msg, setMsg] = useState('');

  const sendMsgHandler = (e: any) => {
    if (e.key === 'Enter' && msg.trim().length > 0) {
      sendMsg(msg, user_id as string, username as string);
      setMsg('');
    }
  };

  useEffect(() => {
    const elem = document.getElementById('chat-content');

    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  }, [msgs]);

  if (isLoading) {
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
