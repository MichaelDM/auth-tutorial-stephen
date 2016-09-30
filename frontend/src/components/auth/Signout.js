import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutAction } from '../../actions/authAction';

class Signout extends Component {

  signoutAction = () => {
    this.props.dispatch(signoutAction());
  }

  render() {
    return (
      <li className="nav-item">
        <Link
          onClick={this.signoutAction}
          to="/">
          Sign Out
        </Link>
      </li>
    );
  }
}

export default connect()(Signout);
