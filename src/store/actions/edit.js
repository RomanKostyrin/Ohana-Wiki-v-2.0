import axios from 'axios'
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_START,
  FETCH_SUBPOSTS,
  CHANGE_SUBPOSTS,
  CHANGE_ACTIVE_SUBPOST,
} from './actionTypes'

let getIndexFromSome = (string) => {
  const indexOfDash = string.indexOf('-')
  const newIndex = string.slice(indexOfDash + 1, string.length)
  return newIndex
}

export function deleteSubEl(props, id) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    let btnId = getIndexFromSome(id)
    let tmpSubs = props.subPosts
    if (tmpSubs[props.activeSubPost].data.value.length === 1) {
      return alert('Нельзя удалять единственный')
    }
    tmpSubs[props.activeSubPost].data.type.splice(btnId, 1)
    tmpSubs[props.activeSubPost].data.value.splice(btnId, 1)
    dispatch(changeSubPosts(tmpSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function isDisabledButtonsFunction(bool) {
  return (dispatch) => {
    dispatch(fetchPostsStart(bool))
  }
}

export function addText(props) {
  return (dispatch) => {
    let tempSubs = props.subPosts
    tempSubs[props.activeSubPost].data.type.push('text')
    tempSubs[props.activeSubPost].data.value.push('')
    dispatch(changeSubPosts(tempSubs))
  }
}

export function changeActiveSub(value) {
  return (dispatch) => {
    dispatch(changeActiveSubPost(value))
  }
}

export function changeSubPost(props, event) {
  return (dispatch) => {
    let tempSubs = props.subPosts
    tempSubs[props.activeSubPost].name = event.target.value
    dispatch(changeSubPosts(tempSubs))
  }
}

export function fetchSubPosts(props, id) {
  return async (dispatch) => {
    let keyDB = props.keys[id]
    let activePost = id
    dispatch(fetchPostsStart)
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )
      dispatch(changeActiveSubPost(0))
      dispatch(fetchSubPostsSuccess(response.data.subPosts, activePost))
      console.log(response.data)
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function fetchPosts() {
  return async (dispatch) => {
    dispatch(fetchPostsStart(true))
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

export function changeActiveSubPost(activeSubPost) {
  return {
    type: CHANGE_ACTIVE_SUBPOST,
    activeSubPost,
  }
}

export function changeSubPosts(subPosts) {
  return {
    type: CHANGE_SUBPOSTS,
    subPosts,
  }
}

export function fetchSubPostsSuccess(subPosts, activePost) {
  return {
    type: FETCH_SUBPOSTS,
    subPosts,
    activePost,
  }
}

export function fetchPostsStart(bool) {
  return {
    type: FETCH_POSTS_START,
    bool,
  }
}

export function fetchPostsSuccess(posts, subPosts, keys) {
  console.log(subPosts)
  return {
    type: FETCH_POSTS_SUCCESS,
    posts,
    subPosts,
    keys,
  }
}

export function fetchPostsError(e) {
  return {
    type: FETCH_POSTS_ERROR,
    error: e,
  }
}
