import { ADD_LINE, RESET_LINES } from '../actions/repl'

export default function repl(state = [], action) {
  switch (action.type) {
    case ADD_LINE:
      return [...state, action.payload]
    case RESET_LINES:
      return []
    default:
      return state
  }
}
