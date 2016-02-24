import { SET_LANG, SET_KEYBINDING } from '../actions/settings'

import { DEFAULT_LANG } from '../replwrappers/ReplWrapperFactory'
import { DEFAULT_KEY_BINDING } from '../components/Editor'

const defaultState = { lang: DEFAULT_LANG, keyBinding: DEFAULT_KEY_BINDING }
export default function settings(state = defaultState, action) {
  switch (action.type) {
    case SET_LANG:
      const lang = action.payload
      return { ...state, lang }
    case SET_KEYBINDING:
      const keyBinding = action.payload
      return { ...state, keyBinding }
    default:
      return state
  }
}
