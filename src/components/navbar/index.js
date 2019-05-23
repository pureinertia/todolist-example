
import { connect } from 'react-redux';
import NavBar from './navbar';

const mapState = ({ auth }) => ({
  user: auth.user,
});

export default connect(
  mapState,
)(NavBar);
