import {RootState} from 'main';
import {connect} from 'react-redux';

import {authenticateWithLoginAndPasswordSaga, regWithDataSaga} from './actions';
import Authorization from './Authorization';

const mapStateToProps = (state: RootState) => ({
	isAuth: state.user.isAuth,
	isPending: state.auth.isPending,
	location: state.router.location,
});

const mapDispatchToProps = {
	regWithDataSaga,
	authenticateWithLoginAndPasswordSaga,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
