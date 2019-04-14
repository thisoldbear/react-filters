import React from 'react'

import { SORT_A_Z, SORT_Z_A, SORT_YEAR_LOW_TO_HIGH, SORT_YEAR_HIGH_TO_LOW } from '../common/consts'
import { FilterContext } from '../context/filter'
import { DataContext } from '../context/data'

import Album from './album'

const sortHighToLow = (a, b) =>
  (a > b) ? -1 : (a < b) ? 1 : 0

const sortLowToHigh = (a, b) =>
  (a < b) ? -1 : (a > b) ? 1 : 0

const sortAlbums = (albums, sortFilter) =>
  [...albums].sort((a, b) => {
    const titleA = a.title.toUpperCase()
    const titleB = b.title.toUpperCase()
    const yearA = a.year.toUpperCase()
    const yearB = b.year.toUpperCase()

    switch (sortFilter) {
      case SORT_A_Z:
        return sortLowToHigh(titleA, titleB)

      case SORT_Z_A:
        return sortHighToLow(titleA, titleB)

      case SORT_YEAR_HIGH_TO_LOW:
        return sortHighToLow(yearA, yearB)

      case SORT_YEAR_LOW_TO_HIGH:
        return sortLowToHigh(yearA, yearB)

      default:
        return []
    }
  })

const filterAlbums = (albums, labelFilter) => {
  if (!labelFilter.length) {
    return albums
  }

  return albums.filter((album) => labelFilter.includes(album.label) ? album : false)
}

const sortAndFilterAlbums = (albums, sortFilter, labelFilter) => {
  const sortedAlbums = sortAlbums(albums, sortFilter) || []
  return filterAlbums(sortedAlbums, labelFilter)
}

const AlbumList = () => (
  <FilterContext.Consumer>
    {({ state: { sortFilter, labelFilter } }) =>
      <DataContext.Consumer>
        {({ state: { albums } }) =>
          <div>
            {
              albums.length ?
                sortAndFilterAlbums(albums, sortFilter, labelFilter)
                  .map(({ title, year, label }) =>
                    <Album
                      title={title}
                      year={year}
                      label={label}
                      key={title}
                    />
                  ) : <div>Loading</div>
            }
          </div>
        }
      </DataContext.Consumer>
    }
  </FilterContext.Consumer>
)

export default AlbumList
