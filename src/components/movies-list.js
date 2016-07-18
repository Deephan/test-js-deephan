import React from 'react'
import { connect } from 'react-redux'

export function MoviesList(props) {
  const { movies } = props

  if (movies.length === 0) return null

  return (
    <table>
      <thead>
        <tr>
          <td></td>
          <td>Year</td>
          <td>Title</td>
          <td>Price</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {
          movies.map((movie, index) => {
            return (
              <tr key={index}>
                <td><img src={movie.artworkUrl100} /></td>
                <td>{movie.releaseYear}</td>
                <td>{movie.trackName}</td>
                <td>{`$${movie.trackHdPrice}`}</td>
                <td>{movie.longDescription}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

const mapStateToProps = state => {
  return {
    movies: state.movies
  }
}

export default connect(mapStateToProps)(MoviesList)
