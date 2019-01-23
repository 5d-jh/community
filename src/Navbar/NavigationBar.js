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
        <NavbarBrand href="/">
          Community
        </NavbarBrand>
        <UncontrolledDropdown>
          <Nav className="ml-auto" navbar>
            <Store.Consumer>
              {store => (
                !store.loggedIn ? (
                  <div>
                    <DropdownToggle nav caret>
                      로그인
                    </DropdownToggle>
                    <DropdownMenu right style={{
                      width: 200,
                      padding: 10
                    }}>
                      <Form onSubmit={this.submitLoginForm}>
                        <FormGroup>
                          <Label for="username">사용자 이름</Label>
                          <Input type="text" id="username" onChange={(e) => {
                            this.setState({inputUsername: e.target.value});
                          }} />
                        </FormGroup>
                        <FormGroup>
                          <Label for="password">비밀번호</Label>
                          <Input type="password" id="password" onChange={(e) => {
                            this.setState({inputPassword: e.target.value});
                          }} />
                        </FormGroup>
                        <Input type="submit" value="로그인" />
                      </Form>
                    </DropdownMenu>
                  </div>
                ) : store.username
              )}
            </Store.Consumer>
          </Nav>
        </UncontrolledDropdown>
      </Navbar>
    )
  }
}