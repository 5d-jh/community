import React from 'react';
import { 
  Form, 
  FormGroup,
  Input, 
  Nav, 
  NavItem, 
  NavLink 
} from 'reactstrap';

export default class PostSubmitForm extends React.Component {
  constructor(props) {
    super(props)

    this.submitPost = (event) => {
      event.preventDefault();

      const url = 'http://localhost:3000/api/post/create';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.inputTitle || 'hi',
          body: this.state.inputBody || 'everybody'
        })
      })
      .then(props.onSubmitPost);
    }

    this.forms = {
      article: (
        <Form onSubmit={this.submitPost}>
          <FormGroup>
            <Input type="text" placeholder="제목" onChange={(e) => {this.setState({inputTitle: e.target.value})}} />
          </FormGroup>
          <FormGroup>
            <Input type="textarea" onChange={(e) => {this.setState({inputBody: e.target.value})}} />
          </FormGroup>
          <FormGroup>
            <Input type="submit" value="글쓰기" />
          </FormGroup>
        </Form>
      ),
      snippet: (
        <Form>
          <FormGroup>
            <Input type="textarea" id="text" />
          </FormGroup>
          <FormGroup>
            <Input type="submit" value="글쓰기" />
          </FormGroup>
        </Form>
      ),
      picture: (
        <Form>
          <FormGroup>
            <Input type="text" placeholder="제목" id="text" />
          </FormGroup>
          <FormGroup>
            <Input type="file" id="text" />
          </FormGroup>
        </Form>
      )
    };
  }


  state = {
    postTypeSelected: 'article',
    inputTitle: null,
    inputBody: null
  }

  render() {
    return (
      <div>
        <Nav className="nav-fill">
          <NavItem>
            <NavLink
              href="#"
              onClick={() => this.setState({postTypeSelected: 'article'})}>
              아티클
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              onClick={() => this.setState({postTypeSelected: 'snippet'})}>
              스니펫
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              onClick={() => this.setState({postTypeSelected: 'picture'})}>
              사진
            </NavLink>
          </NavItem>
        </Nav>
        <div>
          {this.forms[this.state.postTypeSelected]}
        </div>
      </div>
    )
  }
}