import React from 'react'

import FilterContextProvider from './context/filter'
import DataContextProvider from './context/data'

import { fetchAlbums } from './services'

import Filters from './components/filters'
import AlbumList from './components/album-list'

import './App.css'

class App extends React.Component {
  state = {
    albums: [],
  }

  componentDidMount = async () => {
    const albums = await fetchAlbums()

    this.setState({
      albums
    })
  }

  render() {
    return (
      <div className="App">
        <DataContextProvider albums={this.state.albums}>
          <FilterContextProvider>
            <div>
              <h1>Jawbreaker Discography</h1>
              <Filters />
            </div>
            <div>
              <AlbumList />
            </div>
          </FilterContextProvider>
        </DataContextProvider>
      </div>
    )
  }
}

export default App
