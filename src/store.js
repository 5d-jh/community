import React from 'react';

const { Provider, Consumer: CommunityContextConsumer } = React.createContext();

class CommunityContextProvider extends React.Component {
  state = {
    userSessionInfo: null,
    uriParameter: null
  }

  actions = {
    setValue: (value) => {
      this.setState(value);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <Provider value={{ 
        state: this.state, 
        actions: this.actions 
      }}>
        { children }
      </Provider>
    )
    
  }
}

export { CommunityContextProvider, CommunityContextConsumer };