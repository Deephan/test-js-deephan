import React from 'react'
import { connect } from 'react-redux'

import { getPopularMovies } from '../state/actions'

class GetMoviesBtn extends React.Component {
  constructor (props) {
    super(props)
  }

  _requestMovies () {
    const { dispatch } = this.props

    dispatch(getPopularMovies())
  }

  render () {
    return (
      <button onClick={() => {this._requestMovies()}}>
        Get Popular Movies
      </button>
    )
  }
}

export default connect()(GetMoviesBtn)
