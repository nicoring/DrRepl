import ace from 'brace'
import 'brace/ext/static_highlight'
import './aceImports'


const highlighter = ace.acequire('ace/ext/static_highlight')
const theme = ace.acequire('ace/theme/github')

const modeCache = {}
function getMode(lang) {
  let mode
  if (lang in modeCache) {
    mode = modeCache[lang]
  } else {
    mode = new (ace.acequire('ace/mode/' + lang).Mode)()
    modeCache[lang] = mode
  }
  return mode
}

export default function highlight(data, lang) {
  const mode = getMode(lang)
  var highlighted = highlighter.renderSync(data, mode, theme, 1, true)
  return highlighted
}
