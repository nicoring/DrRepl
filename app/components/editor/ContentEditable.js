import React from 'react'

// inspired by from https://github.com/lovasoa/react-contenteditable
export default class ContentEditable extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool,
    html: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  static defaultProps = {
    disabled: false
  };

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.getHtml() ||
            this.props.disabled !== nextProps.disabled
  }

  componentDidUpdate() {
    if (this.props.html !== this.getHtml()) {
      this.setHtml(this.props.html)
    }
  }

  getText() {
    return this.htmlElement.textContent
  }

  getHtml() {
    return this.htmlElement.innerHTML
  }

  setHtml(html) {
    this.htmlElement.innerHTML = html
  }

  handleChange() {
    const html = this.getHtml()
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(this.getText())
    }
    this.lastHtml = html
  }

  render() {
    return (
      <div {...this.props}
        ref={(e) => this.htmlElement = e}
        onInput={this.handleChange}
        onBlur={this.handleChange}
        contentEditable={!this.props.disabled}
        dangerouslySetInnerHTML={{ __html: this.props.html }} >
      </div>
    )
  }
}
