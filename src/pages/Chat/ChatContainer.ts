import {RootState} from 'main';
import {connect} from 'react-redux';

import Chat from './Chat';

const mapStateToProps = (state: RootState) => ({
  access: state.auth.accessToken,
});

export default connect(mapStateToProps, {})(Chat);
