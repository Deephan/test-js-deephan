import React from 'react'
import GetMoviesBtn from './get-movies-btn'
import MoviesList from './movies-list'

export function App(props) {
  return (
    <main>
      <h1>Welcome to the Doorsteps Movies!</h1>
      <GetMoviesBtn />
      <MoviesList />
    </main>
  )
}

export default App
