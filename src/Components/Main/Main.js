import React from 'react'
import classes from './Main.module.scss'
import Post from '../Post/Post'
import Editor from '../Editor/Editor'

class Main extends React.Component {
  render() {
    if (this.props.activePost === 10) {
      return (
        <Editor
          posts={this.props.posts}
          subPost={this.props.subPost}
          ChangePostHandle={(data) => this.props.ChangePostHandle(data)}
          activePost={(num) => this.props.activePost(num)}
        />
      )
    } else
      return (
        <Post
          className={classes.Post}
          posts={this.props.posts}
          activePost={(num) => this.props.activePost(num)}
          activeSubPost={this.props.activeSubPost}
          subPost={this.props.subPost}
          onClick={this.props.onClick}
        />
      )
  }
}

export default Main
