import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import Signout from './auth/Signout';

class Header extends Component {

  renderLinks() {
    if(!this.props.signedIn) {
      return [
        <li className="nav-item" key={1}>
          <Link to="/signin">Sign in</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link to="/signup">signup</Link>
        </li>
      ];
    } else {
      return <Signout />;
    }
  }

render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <IndexLink to="/">HOME PAGE</IndexLink>
          </li>
          {this.renderLinks()}
          <li className="nav-item">
            <Link to="/sensitivedata">sensitivedata</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { signedIn: state.auth.signedIn };
}

export default connect(mapStateToProps)(Header);
