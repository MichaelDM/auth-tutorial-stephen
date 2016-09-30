import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { signInAction } from '../../actions/authAction';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  if (!values.passwordVerification) {
    errors.passwordVerification = 'Password is required';
  } else if (values.password !== values.passwordVerification) {
    errors.passwordVerification = 'Passwords must match';
  }
  return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


class Signin extends Component {

  onSubmit = ({ email, password }) => {
    this.props.dispatch(signInAction('signup', { email, password }));
  }

  renderAlert = () => {
    if(this.props.errorMessage){
      return <div className="alert alert-danger">{this.props.errorMessage}</div>
    }
  }

  render(){
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name="email" type="email" component={renderField} label="email" />
        <Field name="password" type="password" component={renderField} label="password" />
        <Field name="passwordVerification" type="password" component={renderField} label="passwordVerification" />
        <div>
          {this.renderAlert()}
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const myForm = connect(mapStateToProps)(Signin);

export default reduxForm({
  form: 'signin',
  validate
})(myForm);
