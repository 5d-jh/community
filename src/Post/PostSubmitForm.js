import React from 'react';
import { 
  Form, 
  FormGroup,
  Input, 
  Nav, 
  NavItem, 
  NavLink 
} from 'reactstrap';
import { Mutation } from 'react-apollo';
import { CREATE_ARTICLE, CREATE_SNIPPET } from '../queries';

export default class PostSubmitForm extends React.Component {
  state = {
    postTypeSelected: 'article',
    inputTitle: null,
    inputBody: null
  }

  submitForms = (formType) => {
    const { inputTitle, inputBody } = this.state;

    return {
      article: (
        <Mutation 
          mutation={CREATE_ARTICLE}
          variables={{
            title: inputTitle, 
            body: inputBody,
            postType: 'article'
          }}
          onCompleted={({createPost}) => {
            window.location.replace(`/#/view/${createPost}`);
          }}
        >
          {postMutation => (
            <Form onSubmit={postMutation}>
              <FormGroup>
                <Input type="text" placeholder="제목" onChange={e => {this.setState({inputTitle: e.target.value})}} />
              </FormGroup>
              <FormGroup>
                <Input type="textarea" onChange={e => {this.setState({inputBody: e.target.value})}} />
              </FormGroup>
              <FormGroup>
                <Input type="submit" value="글쓰기" />
              </FormGroup>
            </Form>
          )}
        </Mutation>
      ),

      snippet: (
        <Mutation
          mutation={CREATE_SNIPPET}
          variables={{
            body: inputBody,
            postType: 'snippet'
          }}
          onCompleted={({createPost}) => {
            window.location.replace(`/#/view/${createPost}`);
          }}
        >
          {postMutation => (
            <Form onSubmit={postMutation}>
              <FormGroup>
                <Input type="textarea" id="text" onChange={e => {this.setState({inputBody: e.target.value})}} />
              </FormGroup>
              <FormGroup>
                <Input type="submit" value="글쓰기" />
              </FormGroup>
            </Form>
          )}
        </Mutation>          
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
    }[formType];
  }
  
  render() {
    const { postTypeSelected } = this.state;

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
          {this.submitForms(postTypeSelected)}
        </div>
      </div>
    )
  }
}