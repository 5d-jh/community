import React from 'react';
import './Categories.css';
import { Popup } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { CommunityContextConsumer } from '../store';

const CATEGORY = gql`
  query {
    categories
  }
`;

class Categories extends React.Component {
  render() {
    const { location } = this.props;

    return (
      <div className="categories">
        <CommunityContextConsumer>
          {({ actions }) => (
            <Query query={CATEGORY}>
              {({ loading, data, error }) => {
                if (error) return error;
                if (loading) return "loading";

                if (data) {
                  return data.categories.map(category => (
                    <Popup
                      trigger={
                        <Link
                          to={{ pathname: location.pathname, search: `?category=${category}` }}
                          onClick={() => {
                            actions.setValue({ uriParameter: `?category=${category}` });
                          }}
                        >
                          {String(category)}
                        </Link>
                      }
                      content={category}
                      position="right center"
                    />
                  ))
                }
              }}
            </Query>
          )}
        </CommunityContextConsumer>
      </div>
    )
  }
}

export default withRouter(Categories);