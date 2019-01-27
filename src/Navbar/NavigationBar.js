import React from 'react';
import Store from '../store';
import {
  Button,
  Nav,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

export default class NavigationBar extends React.Component {
  state = {
    inputUsername: null,
    inputPassword: null
  }

  submitLoginForm = (event) => {
    event.preventDefault();

    const url = 'http://localhost:3000/api/user/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.inputUsername,
        password: this.state.inputPassword
      })
    })
    .then(data => data.json())
    .then(json => {console.log(json)})
    .then(() => this.props.getSessionUserInfo());
  }

  render() {
    return (
      <Navbar color="light">
        <NavbarBrand>
          Community
        </NavbarBrand>
        <UncontrolledDropdown>
          <Nav className="ml-auto" navbar>
            
          </Nav>
        </UncontrolledDropdown>
      </Navbar>
    )
  }
}