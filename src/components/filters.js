import React, { Component } from 'react';

import { FilterContext, DataContext } from '../context';

const albumLabels = albums => {
  return albums.reduce((acc, curr) => {
    return acc.includes(curr.label) ? acc : [curr.label, ...acc];
  }, []);
}

class Filters extends Component {
  render() {
    return (
      <FilterContext.Consumer>
        {({ setSortFilter, addLabelFilter, removeLabelFilter, resetLabelFilter, labelFilter }) =>
          <DataContext.Consumer>
            {(albums) => {
              const labels = albumLabels(albums);

              return (
                <div>
                  <h2>Sort</h2>

                  <select onChange={({ target: { value } }) => {
                    setSortFilter(value)
                  }}>
                    <option value="sort-year-low">Sort Year (Low to High)</option>
                    <option value="sort-year-high">Sort Year (High to Low)</option>
                    <option value="sort-a-z">Sort A-Z</option>
                    <option value="sort-z-a">Sort Z-A</option>
                  </select>

                  <h3>Filter by label</h3>

                  {
                    labels && labels.map(label => {
                      return (
                        <div key={label}>
                          <label>
                            <input type="checkbox" value={label} onChange={({ target: { value } }) => {
                              if (labelFilter.includes(label)) {
                                removeLabelFilter(value)
                              } else {
                                addLabelFilter(value)
                              }
                            }} checked={labelFilter.includes(label)} />
                            {label}
                          </label>
                        </div>
                      )
                    })
                  }

                  {labelFilter.length > 0
                   &&
                    <button onClick={() => {
                      resetLabelFilter()
                    }}>Deselect all</button>
                  }
                  <hr />
                </div>
              )}
            }
          </DataContext.Consumer>
        }
      </FilterContext.Consumer>
    );
  }
}

export default Filters;
