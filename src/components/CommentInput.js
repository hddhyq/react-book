import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.any,
    onsubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      content: '',
      createdTime: null
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handleContentChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state;
      this.props.onSubmit({
        username,
        content,
        createdTime: +new Date()
      });
    }
    this.setState({ content: '' });
  }

  handleUsernameBlur(e) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(e.target.value)
    }
  }

  render() {
    const { username, content } = this.state;

    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={username}
              onBlur={this.handleUsernameBlur}
              onChange={this.handleUsernameChange}
            />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              value={content}
              onChange={this.handleContentChange}
              ref={(textarea) => this.textarea = textarea}
            />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit}
          >
            发布
          </button>
        </div>
      </div>
    );
  }
}

export default CommentInput