import {RootState} from 'main';
import {connect} from 'react-redux';
import {initSocketSaga} from './actions';
import {setUserData} from 'library/common/actions/user'

import Chat from './Chat';

const mapStateToProps = (store: RootState) => ({
  access: store.auth.accessToken,
  isAuth: store.user.isAuth,
  isConnected: store.chat.isConnected,
  _socket: store.chat.socket,
  user_id: store.user.user_id,
  username: store.user.username,
});

const mapDispatchToProps = ({
  initSocketSaga,
  setUserData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
