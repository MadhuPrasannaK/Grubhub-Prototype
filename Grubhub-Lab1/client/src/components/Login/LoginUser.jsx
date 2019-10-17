import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from './../../images/grubhub-1177056.png';
import './LoginUser.css';

import { userActions } from "../../js/actions/index";

class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleUserLogin = e => {
    e.preventDefault();
    const payload = this.state;
    this.props.loginUser(payload);
  };

  render() {
    return (
      <div className="background-image">
      <div className="container shadow p-3 singup_form">
          <img src={logo} className="rounded mx-auto d-block signinlogo" alt="Logo"></img>
        <form onSubmit={e => this.handleUserLogin(e)}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              onChange={this.handleChange}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              minLength="8"
              required
              onChange={this.handleChange}
            />
            <br/><br/>
            <button className="btn btn-danger btn-block" type="submit">
                <b>Sign in</b>
            </button>
          </div>
          <Link to="/create-user">
            <p className="text-center">Create User Account</p>
          </Link>
        </form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
const mapDispatchToProps = (dispath, ownProps) => ({
  loginUser: payload => dispath(userActions.loginUser(payload, ownProps))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginUser);
