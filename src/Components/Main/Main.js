import React from 'react'
import classes from './Main.module.scss'
import Post from '../Post/Post'

class Main extends React.Component {
  render() {
    return (
      <Post
        className={classes.Post}
        posts={this.props.posts}
        activePost={this.props.activePost}
        activeSubPost={this.props.activeSubPost}
        subPosts={this.props.subPosts}
        onClick={this.props.onClick}
      />
    )
  }
}

export default Main
