import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";
import cookie from "js-cookie";

class Navigbar extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }
  componentDidMount() {
    this.setState({
      user: this.props.user
    });
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.user
    });
  }

  handleLogout = e => {
    e.preventDefault();
    cookie.remove("token");
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    const redirect = `\\${this.state.user.id}\\search`;
    return (
      <Navbar bg="dark" expand="lg" className="fluid">
        <Navbar.Brand href="/">
          <img
            src="https://www.underconsideration.com/brandnew/archives/grubhub_logo.png"
            width="125px"
            height="50px"
            className="d-inline-block align-top"
            alt="Main logo link to home"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto fluid">
            <NavDropdown
              title={this.state.user.first_name}
              id="basic-nav-dropdown"
              drop="left"
            >
              <NavDropdown.Item href={`/${this.state.user.id}/profile`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href={`/${this.state.user.id}/order`}>
                Order
              </NavDropdown.Item>
              <NavDropdown.Item href={`/${this.state.user.id}/cart`}>
                Cart
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.handleLogout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Navigbar);
