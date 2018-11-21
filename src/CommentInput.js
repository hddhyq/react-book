import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {
  static propTypes = {
    onsubmit: PropTypes.func
  }

  constructor() {
    super();
    this.state = {
      username: '',
      content: '',
      createdTime: null
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
  }

  componentWillMount() {
    this._loadUsername();
  }

  componentDidMount() {
    this.textarea.focus();
  }

  _loadUsername() {
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({ username });
    }

  }

  _saveUsername(username) {
    localStorage.setItem('username', username);
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value
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

  handleUsernameBlur(event) {
    this._saveUsername(event.target.value);
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