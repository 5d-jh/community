import React from 'react';
import './Categories.css';
import { Button, Popup } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CATEGORY = gql`
  query {
    categories
  }
`;

export default class Categories extends React.Component {
  render() {
    return (
      <div className="categories">
        <Query query={CATEGORY}>
          {({loading, data, error}) => {
            if (error) return error;
            if (loading) return "loading";

            if (data) {
              return data.categories.map(category => (
                <Popup
                  trigger={
                    <Button className="category-button">
                      {String(category)}
                    </Button>
                  }
                  content={category}
                  position="right center"
                />
              ))
            }
          }}
        </Query>
      </div>
    )
  }
}