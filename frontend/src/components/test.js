import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {
  render(){
    if(this.props.form.signin) {
      return (
        <div>
          email submitted is: {this.props.form.signin.values.email}<br/>
          password submitted is: {this.props.form.signin.values.password}
        </div>
      )
    } else {
      return <div>
        <h1>hello user!</h1>
        <h3>This is your home page</h3>
      </div>
    }
  }
}

function mapStateToProps(state) {
  return { form: state.form };
}

export default connect(mapStateToProps)(Test);
