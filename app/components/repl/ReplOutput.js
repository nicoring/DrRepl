import ReplLine from './ReplLine'

export default class ReplOutput extends ReplLine {

  constructor(props) {
    super(props)
  }

  getClassName() {
    return 'repl-output'
  }

  getContent() {
    return this.props.content
  }
}
