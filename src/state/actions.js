import fetch from 'fetch-jsonp'
import moment from 'moment'

export function getPopularMovies () {
  return dispatch => {
    const fourStarUrl = 'https://itunes.apple.com/search?country=us&media=movie&entity=movie&limit=100&attribute=ratingIndex&term=4'
    const fiveStarUrl = 'https://itunes.apple.com/search?country=us&media=movie&entity=movie&limit=100&attribute=ratingIndex&term=5'
    const req1 = fetch(fourStarUrl)
    const req2 = fetch(fiveStarUrl)
    const rsDate =   /^(\d+)-(\d+)-(\w+):(\d+):(\d+)Z$/g
    const rsDateSeparator = /-/g
    const reHasRsDate = RegExp(rsDate.source)

    return Promise.all([req1, req2])
      .then(responses => responses.map(res => res.json()))
      .then(jsonPromises => Promise.all(jsonPromises))
      .then(jsonResponses => {
        //
        // jsonResponses contains the results of two API requests
        //

        //
        // 1. combine the results of these requests
        // 2. sort the results FIRST by year THEN by title (trackName)
        // 3. each movie object in the results needs a releaseYear attribute added
        //    this is used in src/components/movies-list.js line 26
        //

        const combinedResults = []

        // Combine the results of the requests
        for(var obj of jsonResponses) {
          if(typeof obj.results == 'object' && obj.results && Array.isArray(obj.results)){
            obj.results.map((movie, index) => {
              // Creating this object just to make sure we have the five required attributes
              // instead of a ton of them from the original request
              var currentMovie = {}
              
              // Adding the releaseYear attribute after doing a preliminary regex test for release date of format YYYY-MM-DDTHH:MM:SSZ
              if(typeof movie.releaseDate == "string" && reHasRsDate.test(movie.releaseDate)) {
                // Split the releaseDate by the date separator
                currentMovie.releaseYear = movie.releaseDate.split(rsDateSeparator).shift()
              }
              currentMovie.artworkUrl100 = movie.artworkUrl100
              currentMovie.trackName = movie.trackName
              currentMovie.trackHdPrice = movie.trackHdPrice
              currentMovie.longDescription = movie.longDescription

              combinedResults.push(currentMovie)
            })
          }
        }

        // Primary sorting of the results by year
        combinedResults.sort(function(a, b) {
          if (parseInt(a.releaseYear) > parseInt(b.releaseYear)) {
            return 1
          }
          if (parseInt(a.releaseYear) < parseInt(b.releaseYear)) {
            return -1
          }
          // Secondary sorting of the results by title
          if(parseInt(a.releaseYear) == parseInt(b.releaseYear)) {
            if(a.trackName < b.trackName) return -1
            if(a.trackName > b.trackName) return 1
          }
        })

        return dispatch({
          type: 'GET_MOVIES_SUCCESS',
          movies: combinedResults
        })
      })
  }
}
