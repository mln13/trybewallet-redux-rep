import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      button: true,
      emailHolder: '',
    };
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.passwordEnableButton = this.passwordEnableButton.bind(this);
  }

  handleClickSubmit() {
    const { emailHolder } = this.state;
    const { handleLogin, history } = this.props;
    handleLogin(emailHolder);
    history.push('/carteira');
  }

  passwordEnableButton(event) {
    // const { emailHolder } = this.state;
    // const Regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const six = 6;
    this.setState({
      button: (event.target.value.length < six),
    });
  }

  render() {
    const { button } = this.state;
    return (
      <div>
        <label htmlFor="loginInput">
          Email:
          <input
            id="loginInput"
            data-testid="email-input"
            placeholder="Insert Email"
            type="email"
            onChange={ (event) => {
              this.setState({
                emailHolder: event.target.value,
              });
            } }
          />
        </label>
        <label htmlFor="passwordInput">
          Password:
          <input
            id="passwordInput"
            data-testid="password-input"
            placeholder="Insert Password"
            type="password"
            onChange={ (event) => this.passwordEnableButton(event) }
          />
        </label>
        <button
          type="button"
          disabled={ button }
          onClick={ this.handleClickSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    handleLogin: (email) => dispatch(userAction(email)),
  };
}

export default connect(null, mapDispatchToProps)(Login);
