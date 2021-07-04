import axios from 'axios'
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_START,
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
      console.log('bef')
      dispatch(fetchPostsSuccess(arrPosts, arrSubPosts, keys))
      console.log('after')
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
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
