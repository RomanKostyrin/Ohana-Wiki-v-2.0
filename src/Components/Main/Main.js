import React from 'react'
import classes from './Main.module.scss'
import Post from '../Post/Post'
import Editor from '../Editor/Editor'
import Users from '../Users/Users'

class Main extends React.Component {
  render() {
    if (this.props.activePost === 10) {
      return <Editor />
    } else if (this.props.activePost === 20) {
      return <Users />
    } else
      return (
        <Post
          ImgId={this.props.ImgId}
          ImgButtonClass={this.props.ImgButtonClass}
          ImgClass={this.props.ImgClass}
          onImgClick={this.props.onImgClick}
          subPosts={this.props.subPosts}
          className={classes.Post}
          posts={this.props.posts}
          activePost={this.props.activePost}
          activeSubPost={this.props.activeSubPost}
          subPost={this.props.subPost}
          onClick={this.props.onClick}
        />
      )
  }
}

export default Main
