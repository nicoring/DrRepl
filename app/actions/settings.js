export const SET_KEYBINDING = 'SET_KEYBINDING'
export const SET_LANG = 'SET_LANG'

export function setKeybinding(keyBinding) {
  return {
    type: SET_KEYBINDING,
    payload: keyBinding
  }
}

export function setLang(lang) {
  return {
    type: SET_LANG,
    payload: lang
  }
}
