import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function authHOC(WrappedComponent) {

  class AuthHOC extends Component {
    static contextTypes = { //class level property, allows us anywhere to use Authentication.contextTypes, without creating a new instance of Authentication!
      router: PropTypes.object
    }

    componentWillMount(){
      if(!this.props.signedIn){
        this.context.router.push('/signin');
      }
    }

    componentWillReceiveProps(nextProps){
      if(!nextProps.signedIn){
        this.context.router.push('/signin');
      }
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {  signedIn: state.auth.signedIn  };
  }

  return connect(mapStateToProps)(AuthHOC);
}
