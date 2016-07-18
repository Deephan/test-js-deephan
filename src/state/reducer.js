import { combineReducers } from 'redux'

function movies (state = [], action) {
  switch (action.type) {
    case 'GET_MOVIES_SUCCESS':
      return action.movies

    default:
      return state
  }
}

const rootReducer = combineReducers({
  movies
})

export default rootReducer
