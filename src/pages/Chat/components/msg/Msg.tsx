import dateFormatter from 'library/utils/dateFormatter';
import React from 'react';
import styles from './msg.scss';

interface IMsg {
  user_id: string;
  owner_id: string;
  username: string;
  date: Date | string;
  text: string;
}

const Msg = ({
  user_id,
  owner_id,
  username,
  date,
  text,
}: IMsg) => (
  <div 
    className={`${styles.message} ${user_id === owner_id ? styles.msgMe : ''}`}
  >
    <div className={styles.msgContent}>
      <div className={`${styles.msgHeader} ${user_id === owner_id ? styles.msgHeadMe : ''}`}>
      <p className={styles.msgOwnerName}>{username}</p>

        <p className={styles.msgDate}>
          {dateFormatter(date)}
        </p>
      </div>

      <p className={styles.msgText}>
        {text}
      </p>
    </div>
  </div>
);

export default Msg;
