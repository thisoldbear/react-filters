import React from 'react';

import { DataContext, FilterContext } from './context';

import { fetchAlbums } from './services';

import Filters from './components/filters';
import AlbumList from './components/album-list';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.updateAlbums = (albums) => {
      this.setState(state => ({
        ...state,
        albums,
      }));
    };

    this.setSortFilter = (filter) => {
      this.setState(state => ({
        ...state,
        sortFilter: filter,
      }));
    };

    this.addLabelFilter = (filter) => {
      this.setState(state => ({
        ...state,
        labelFilter: [...this.state.labelFilter, filter],
      }));
    };

    this.removeLabelFilter = (filter) => {
      this.setState(state => ({
        ...state,
        labelFilter: [...this.state.labelFilter].filter(item => item !== filter),
      }));
    };

    this.resetLabelFilter = () => {
      this.setState(state => ({
        ...state,
        labelFilter: [],
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      albums: [],
      sortFilter: [],
      labelFilter: [],
      updateAlbums: this.updateAlbums,
      setSortFilter: this.setSortFilter,
      addLabelFilter: this.addLabelFilter,
      removeLabelFilter: this.removeLabelFilter,
      resetLabelFilter: this.resetLabelFilter,
    };
  }

  componentDidMount = async () => {
    const albums = await fetchAlbums();

    this.setState({
      albums
    });
  }

  render() {
    return (
      <div className="App">
        <DataContext.Provider value={this.state.albums}>
          <FilterContext.Provider
            value={{
              sortFilter: this.state.sortFilter,
              labelFilter: this.state.labelFilter,
              setSortFilter: this.setSortFilter,
              addLabelFilter: this.addLabelFilter,
              removeLabelFilter: this.removeLabelFilter,
              resetLabelFilter: this.resetLabelFilter
            }}>
            <div>
              <h1>Jawbreaker Discography</h1>
              <Filters />
            </div>
            <div>
              <AlbumList />
            </div>
          </FilterContext.Provider>
        </DataContext.Provider>
      </div>
    );
  }
}

export default App;
