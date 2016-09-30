import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSensitiveDataAction } from '../actions/SensitiveDataAction';

class SensitiveData extends Component {

  componentWillMount() {
     this.props.dispatch(getSensitiveDataAction('sensitivedata'));
  }

  render(){
    if (this.props.data){
      console.log('data in component is ', this.props.data);
      return(
        <div>
          <h2>Confidential data:</h2>
          <p>{this.props.data}</p>
        </div>
      );
    } else {
      return (
        <div>
          Please log in to see the contents of this page
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return { data: state.data.data };
}

export default connect(mapStateToProps)(SensitiveData);
