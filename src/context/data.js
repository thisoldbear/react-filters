import React, { Component } from 'react';

const DataContext = React.createContext();

export default class DataContextProvider extends Component {
  state = {
    albums: this.props.albums,
  }

  componentDidUpdate(prevProps) {
    if (this.props.albums !== prevProps.albums) {
      this.setState(state => ({
        ...state,
        albums: this.props.albums,
      }));
    }
  }

  render() {
    return (
      <DataContext.Provider value={{
        state: this.state,

        updateAlbums: (albums) => {
          this.setState(state => ({
            ...state,
            albums,
          }));
        },
      }}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}

export { DataContext };
