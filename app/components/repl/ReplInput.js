import ReplLine from './ReplLine'

export default class ReplInput extends ReplLine {

  constructor(props) {
    super(props)
  }

  getClassName() {
    return 'repl-input'
  }

  getContent() {
    return '> ' + this.props.content
  }
}
