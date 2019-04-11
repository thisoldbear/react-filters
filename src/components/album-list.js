import React from 'react';

import { DataContext, FilterContext } from '../context';

import Album from './album';

const AlbumList = () => (
  <FilterContext.Consumer>
    {({ sortFilter, labelFilter }) =>
      <DataContext.Consumer>
        {(albums) => {
          const sortedAlbums = albums.length && [...albums].sort((a, b) => {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();
            const yearA = a.year.toUpperCase();
            const yearB = b.year.toUpperCase();

            if (sortFilter === 'sort-a-z') {
              return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
            }
            else if (sortFilter === 'sort-z-a') {
              return (titleA > titleB) ? -1 : (titleA < titleB) ? 1 : 0;
            }
            else if (sortFilter === 'sort-year-low') {
              return (yearA < yearB) ? -1 : (yearA > yearB) ? 1 : 0;
            }
            else if (sortFilter === 'sort-year-high') {
              return (yearA > yearB) ? -1 : (yearA < yearB) ? 1 : 0;
            }

            return [];
          }).filter((album) => {
            if (!labelFilter.length) {
              return album
            } else if (labelFilter.length && labelFilter.includes(album.label)) {
              return album;
            };
          })

          return (
            <div>
              {
                sortedAlbums.length ?
                  sortedAlbums.map(({title, year, label}) =>
                    <Album
                      title={title}
                      year={year}
                      label={label}
                      key={title}
                    />
                  ) : <div>Loading</div>
              }
            </div>
          )
        }}
      </DataContext.Consumer>
    }
  </FilterContext.Consumer>
);

export default AlbumList;
