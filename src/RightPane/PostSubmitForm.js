import React, { Fragment } from 'react';
import { Form, Tab } from 'semantic-ui-react';
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

    const tabIndexName = [
      'article',
      'snippet',
      'picture'
    ]

    return (
      <div>
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
              <Form.Field>
                <input type="text" placeholder="카테고리" onChange={e => {this.setState({inputCategory: e.target.value})}} />
              </Form.Field>
              <Tab 
                onTabChange={(_, { activeIndex }) => this.setState({ postTypeSelected: tabIndexName[activeIndex] })}
                panes={[
                {
                  menuItem: '아티클',
                  render: () => (
                    <Fragment>
                      <Form.Field>
                        <input type="text" placeholder="제목" onChange={e => {this.setState({inputTitle: e.target.value})}} />
                      </Form.Field>
                      <Form.Field>
                        <input type="textarea" onChange={e => {this.setState({inputBody: e.target.value})}} />
                      </Form.Field>
                    </Fragment>
                  )
                }, {
                  menuItem: '스니펫',
                  render: () => (
                    <Fragment>
                      <Form.Field>
                        <input type="textarea" id="text" onChange={e => {this.setState({inputBody: e.target.value})}} />
                      </Form.Field>
                    </Fragment>
                  )
                }, {
                  menuItem: '사진',
                  render: () => (
                    <Fragment>
                      <Form.Field>
                        <input type="text" placeholder="제목" id="text" />
                      </Form.Field>
                      <Form.Field>
                        <input type="file" id="text" />
                      </Form.Field>
                    </Fragment>
                  )
                }
              ]} />
              <Form.Field>
                <input type="submit" value="글쓰기" />
              </Form.Field>
            </Form>
          )}
        </Mutation>
      </div>
    )
  }
}