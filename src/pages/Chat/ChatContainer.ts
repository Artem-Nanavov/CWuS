import {RootState} from 'main';
import {connect} from 'react-redux';
import {initSocketSaga} from './actions';
import {setUserData} from 'library/common/actions/user'

import Chat from './Chat';

const mapStateToProps = (store: RootState) => ({
  user_id: store.user.user_id,
  username: store.user.username,
});

const mapDispatchToProps = ({
  setUserData,
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
