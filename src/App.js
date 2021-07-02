import React from 'react'
import Main from './Components/Main/Main'
import classes from './App.module.scss'
import Navigation from './Components/Navigation/Navigation'
import axios from 'axios'

class App extends React.Component {
  state = {
    keys: [],
    posts: ['', ''],
    activePost: 0,
    activeSubPost: 0,
    subPosts: [
      {
        name: 'subpost1',
        data: {
          type: ['text'],
          value: [''],
        },
      },
    ],
  }

  onEdit = () => {
    this.setState({
      activePost: 10,
    })
  }
  renderPosts = (res) => {
    let arrPosts = []
    let arrSubPosts = []
    let keys = []
    Object.keys(res.data).forEach((key) => {
      keys.push(key)
      arrPosts.push(res.data[key].postName)
    })
    arrSubPosts = res.data[keys[this.state.activeSubPost]].subPosts
    this.setState({
      keys: keys,
      subPosts: arrSubPosts,
      posts: arrPosts,
    })
  }

  onClickSubPost = (event) => {
    axios
      .get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .then(function (response) {
        console.log(response.data)
      })
    const subId = this.getIndexFromSome(event.target.id)
    this.setState({
      activeSubPost: +subId,
    })
  }

  getSubPosts = async (event) => {
    const newActiveIndex = this.getIndexFromSome(event.target.id)
    let keyDB = this.state.keys[newActiveIndex]
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )

      this.setState({
        activePost: +newActiveIndex,
        activeSubPost: 0,
        subPosts: response.data.subPosts,
      })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  getIndexFromSome = (string) => {
    const indexOfDash = string.indexOf('-')
    const newIndex = string.slice(indexOfDash + 1, string.length)
    return newIndex
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      this.renderPosts(response)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <>
        <Navigation
          posts={this.state.posts}
          activePost={this.state.activePost}
          onClick={this.getSubPosts}
          onEdit={this.onEdit}
        />
        <Main
          subPosts={this.state.subPosts}
          className={classes.Main}
          activePost={this.state.activePost}
          activeSubPost={this.state.activeSubPost}
          posts={this.state.posts}
          subPost={this.state.subPosts[this.state.activeSubPost]}
          onClick={this.onClickSubPost}
        />
      </>
    )
  }
}

export default App
