import React, { Component } from 'react'

const FilterContext = React.createContext()

export default class FilterContextProvider extends Component {
  state = {
    sortFilter: [],
    labelFilter: [],
  }

  render() {
    return (
      <FilterContext.Provider value={{
        state: this.state,

        setSortFilter: (filter) => {
          this.setState(state => ({
            ...state,
            sortFilter: filter,
          }))
        },

        addLabelFilter: (filter) => {
          this.setState(state => ({
            ...state,
            labelFilter: [...this.state.labelFilter, filter],
          }))
        },

        removeLabelFilter: (filter) => {
          this.setState(state => ({
            ...state,
            labelFilter: [...this.state.labelFilter].filter(item => item !== filter),
          }))
        },

        resetLabelFilter: () => {
          this.setState(state => ({
            ...state,
            labelFilter: [],
          }))
        },
      }}>
        {this.props.children}
      </FilterContext.Provider>
    )
  }
}

export { FilterContext }
