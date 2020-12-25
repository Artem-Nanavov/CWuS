import React, {
  useState, useEffect, useCallback
} from 'react';
import Logo from 'resources/icons/Logo';
import styles from './auth.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

interface IAuthorization {
  isPending: boolean,
	isAuth: boolean,
	location: any,
  authenticateWithLoginAndPasswordSaga: (login: string, password: string) => void;
  regWithDataSaga: (email: string, password: string, username: string) => void;
}

const Authorization = ({
	isPending,
	isAuth,
  location,
  regWithDataSaga,
	authenticateWithLoginAndPasswordSaga,
}: IAuthorization) => {
  if (isAuth) { return <Redirect to={{pathname: '/', state: {from: location.pathname}}} />; }

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isReg, setIsReg] = useState(false);

	const toPassword = (e: any, step: number) => {
		if (e.keyCode === 13) {
			e.target.form.elements[step].focus();
			e.preventDefault();
		}
	};

  useEffect(() => {
    setLogin('');
    setPassword('');
    setLastName('');
    setLastName('');
    setFirstName('');
  }, [isReg]);

  const authHandler = useCallback(() => {
    if (!isDisabled) {
      if (isReg) {
        regWithDataSaga(login, password, `${firstName} ${lastName}`);
      } else {
        authenticateWithLoginAndPasswordSaga(login, password);
      }
    }
  }, [login, password, isDisabled]);

  useEffect(() => {
    if (isReg) {
      if (
        login.trim().length > 4
        && password.trim().length > 5
        && firstName.trim().length > 2
        && lastName.trim().length > 2
      ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    } else {
      if (login.trim().length > 4 && password.trim().length > 5) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [login, password]);

  return (
    <div className={styles.authWrap}>
      <div className={styles.authForm}>
        <div className={styles.authWrapLogo}>
          <Logo width="150px" height="150px" />
        </div>

        <h1 className={styles.authTitle}> 
          {isReg ? 'Зарегистрируйтесь': 'Авторизуйтесь'}
        </h1>

        <div className={styles.authFields}>
          {isReg && (
            <div className={styles.nameFields}>
              <TextField
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                id="auth-firstName"
                label="Имя"
                size="small"
                variant="outlined"
                onKeyDown={e => toPassword(e, 2)}
              />

              <TextField
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                id="auth-lastName"
                label="Фамилия"
                size="small"
                variant="outlined"
                onKeyDown={e => toPassword(e, 3)}
              />
            </div>
          )}

          <TextField
            value={login}
            onChange={e => setLogin(e.target.value)}
            id="auth-login"
            fullWidth
            label="Логин"
            size="small"
            variant="outlined"
            onKeyDown={e => toPassword(e, isReg ? 4 : 2)}
          />

          <TextField
            value={password}
            onChange={e => setPassword(e.target.value)}
            id="auth-password"
            size="small"
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode === 13) authHandler();
            }}
          />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            type="button"
            disabled={isDisabled}
            onClick={authHandler}
          >
            {isReg ? 'Зарегистрироватсься' : 'Войти'}
          </Button>

          {!isReg ? (
            <p className={styles.authLink} onClick={() => setIsReg(true)}>Зарегистрироватся</p>
          ) : (
            <p className={styles.authLink} onClick={() => setIsReg(false)}>Войти</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authorization;
