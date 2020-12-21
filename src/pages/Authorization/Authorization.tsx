import React, {useState} from 'react';
import Logo from 'recourses/icons/Logo';
import styles from './auth.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Authorization = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.authWrap}>
      <div className={styles.authForm}>
        <div className={styles.authWrapLogo}>
          <Logo width="150px" height="150px" />
        </div>

        <h1 className={styles.authTitle}>Авторизуйтесь</h1>

        <div className={styles.authFields}>
          <TextField
            value={login}
            onChange={e => setLogin(e.target.value)}
            id="outlined-basic"
            fullWidth
            label="Логин"
            size="small"
            variant="outlined"
          />

          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="outlined-basic"
            size="small"
            fullWidth
            label="Пароль"
            variant="outlined"
          />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          type="button"
        >
          Войти
        </Button>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
