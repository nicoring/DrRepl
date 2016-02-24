export const ADD_LINE = 'ADD_LINE'
export const RESET_LINES = 'RESET_LINES'

export function addLine(line) {
  return {
    type: ADD_LINE,
    payload: line
  }
}

export function resetLines() {
  return {
    type: RESET_LINES
  }
}
