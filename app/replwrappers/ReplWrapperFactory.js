import ScalaWrapper from './ScalaWrapper'
import PythonWrapper from './PythonWrapper'
import JsWrapper from './JsWrapper'

export const SCALA_LANG = 'SCALA_LANG'
export const PYTHON_LANG = 'PYTHON_LANG'
export const JS_LANG = 'JS_LANG'

export const DEFAULT_LANG = JS_LANG

export const LANG_NAME_MAPPING = {
  [SCALA_LANG]: 'Scala',
  [PYTHON_LANG]: 'Python',
  [JS_LANG]: 'JavaScript'
}

export const LANGS = Object.keys(LANG_NAME_MAPPING)

const CLASS_MAPPING = {
  [SCALA_LANG]: ScalaWrapper,
  [PYTHON_LANG]: PythonWrapper,
  [JS_LANG]: JsWrapper
}

export default class ReplWrapperFactory {
  static buildWrapperFor(language, inputObservable) {
    if (!(language in CLASS_MAPPING)) {
      throw new Error('[ReplWrapperFactory] Unsupported language: ' + language)
    }
    return new CLASS_MAPPING[language](inputObservable)
  }
}
