import axios from 'axios'
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_START,
  FETCH_SUBPOSTS,
} from './actionTypes'

export function ChangeSubPostName(event) {
  return (dispatch) => {
    event.preventDefault()
    let tempSubs = this.state.subPosts
    tempSubs[this.state.activeSubPost].name = event.target.value
    this.setState({
      subPosts: tempSubs,
    })
  }
}

export function fetchSubPosts(props, id) {
  console.log(props)
  return async (dispatch) => {
    let keyDB = props.keys[id]
    dispatch(fetchPostsStart)
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )

      dispatch(fetchSubPostsSuccess(response.data.subPosts))
      this.setState({
        subPosts: response.data.subPosts,
        isDisabledButtons: false,
      })
      console.log(response.data)
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function fetchPosts() {
  return async (dispatch) => {
    dispatch(fetchPostsStart)
    try {
      const res = await axios.get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      let arrPosts = []
      let arrSubPosts = []
      let keys = []
      Object.keys(res.data).forEach((key) => {
        keys.push(key)
        arrPosts.push(res.data[key].postName)
      })
      arrSubPosts = res.data[keys[0]].subPosts
      dispatch(fetchPostsSuccess(arrPosts, arrSubPosts, keys))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function fetchSubPostsSuccess(subPosts) {
  return {
    type: FETCH_SUBPOSTS,
    subPosts,
  }
}

export function fetchPostsStart() {
  return {
    type: FETCH_POSTS_START,
  }
}

export function fetchPostsSuccess(arrPosts, arrSubPosts, keys) {
  return {
    type: FETCH_POSTS_SUCCESS,
    arrPosts,
    arrSubPosts,
    keys,
  }
}

export function fetchPostsError(e) {
  return {
    type: FETCH_POSTS_ERROR,
    error: e,
  }
}
