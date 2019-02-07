import React, { Fragment } from 'react';
import { 
  Form, 
  FormGroup,
  Input, 
  Nav, 
  NavItem, 
  NavLink 
} from 'reactstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_POST = gql`
  mutation CreatePost(
    $title: String, 
    $body: String!, 
    $postType: String!, 
    $category: String
  ) {
    createPost(
      title: $title, 
      body: $body, 
      postType: $postType, 
      category: $category
    )
  }
`;

export default class PostSubmitForm extends React.Component {
  state = {
    postTypeSelected: 'article',
    inputTitle: null,
    inputBody: null,
    inputCategory: null
  }
  
  render() {
    const { postTypeSelected, inputBody, inputTitle, inputCategory } = this.state;

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
              disabled
              href="#"
              onClick={() => this.setState({postTypeSelected: 'picture'})}>
              사진
            </NavLink>
          </NavItem>
        </Nav>
        <Mutation
          mutation={CREATE_POST}
          variables={{
            title: inputTitle, 
            body: inputBody,
            postType: postTypeSelected,
            category: inputCategory
          }}
          onCompleted={({createPost}) => {
            window.location.replace(`/#/view/${createPost}`);
          }}
        >
          {postMutation => (
            <Form onSubmit={postMutation}>
              <FormGroup>
                <Input type="text" placeholder="카테고리" onChange={e => {this.setState({inputCategory: e.target.value})}} />
              </FormGroup>
              {{
                article: (
                  <Fragment>
                    <FormGroup>
                      <Input type="text" placeholder="제목" onChange={e => {this.setState({inputTitle: e.target.value})}} />
                    </FormGroup>
                    <FormGroup>
                      <Input type="textarea" onChange={e => {this.setState({inputBody: e.target.value})}} />
                    </FormGroup>
                  </Fragment>
                ),
                snippet: (
                  <Fragment>
                    <FormGroup>
                      <Input type="textarea" id="text" onChange={e => {this.setState({inputBody: e.target.value})}} />
                    </FormGroup>
                  </Fragment>
                ),
                picture: (
                  <Fragment>
                    <FormGroup>
                      <Input type="text" placeholder="제목" id="text" />
                    </FormGroup>
                    <FormGroup>
                      <Input type="file" id="text" />
                    </FormGroup>
                  </Fragment>
                )
              }[postTypeSelected]}
              <FormGroup>
                <Input type="submit" value="글쓰기" />
              </FormGroup>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}