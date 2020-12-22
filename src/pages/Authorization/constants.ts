const enum authPageTypes {
  SET_TOKENS = '@@AUTH/SET_TOKENS',
	SET_ACCESS_TOKEN = '@@AUTH/SET_ACCESS_TOKEN',
	SET_REFRESH_TOKEN = '@@AUTH/SET_REFRESH_TOKEN',
	TOGGLE_ISPENNDING = '@@AUTH/TOGGLE_ISPENNDING',
  SEND_SMS_CODE_SAGA = '@@AUTH/SEND_SMS_CODE_SAGA',
	REG_WITH_DATA_SAGA = '@@AUTH/REG_WITH_DATA_SAGA',
	GET_LOCAL_REFRESH_TOKEN_SAGA = '@@AUTH/GET_LOCAL_REFRESH_TOKEN',
	AUTH_WITH_LOGIN_AND_PASSWORD_SAGA = '@@AUTH/AUTHENTICATE_WITH_LOGIN_AND_PASSWORD_SAGA',
};

export default authPageTypes;
