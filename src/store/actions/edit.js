import axios from 'axios'
import {
  FETCH_POSTS_ERROR,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_START,
  FETCH_SUBPOSTS,
  CHANGE_SUBPOSTS,
  CHANGE_ACTIVE_SUBPOST,
  CHANGE_NEW_POST,
  CHANGE_SUBPOST_NAME,
  NEW_POSTNAME_HANDLE,
  NEW_POST_ADD,
  PUT_SUBPOSTS,
  CREATE_NEW_SUBPOST,
} from './actionTypes'

let getIndexFromSome = (string) => {
  const indexOfDash = string.indexOf('-')
  const newIndex = string.slice(indexOfDash + 1, string.length)
  return newIndex
}

export function changePostName(value) {
  return (dispatch) => {
    dispatch(fetchPostsStart(false))
    let newpost = {
      postName: value,
      subPosts: [
        {
          name: '',
          data: {
            type: ['text'],
            value: [''],
          },
        },
      ],
    }
    dispatch(changeNP(newpost))
    dispatch(fetchPostsStart(false))
  }
}

export function onSubmitP() {
  return async (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    try {
      const response = await axios.post(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        state.newPost
      )
      console.log(response)
      let keys = state.keys
      keys.push(response.data.name)
      let arr = state.posts
      let newPost = { postName: '', subPosts: [{}] }
      arr.push(state.newPost.postName)
      dispatch(newPostAdd(arr, newPost, keys))
      dispatch(fetchPostsStart(false))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function onChangeText(event) {
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    const indexOfTextArea = getIndexFromSome(event.target.id)
    const tempSubs = state.subPosts
    tempSubs[state.activeSubPost].data.value[indexOfTextArea] =
      event.target.value

    dispatch(changeSubPosts(tempSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function newPostNameFunction(value) {
  console.log(value)
  return (dispatch) => {
    dispatch(newPostNameHandle(value))
  }
}
export function pathImg(event) {
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    let tempSubs = state.subPosts
    let pathId = getIndexFromSome(event.target.id)
    tempSubs[state.activeSubPost].data.value[pathId] = event.target.value
    dispatch(changeSubPosts(tempSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function changeSPHandle(value) {
  return (dispatch) => {
    const newSubPost = {
      name: value,
      data: {
        type: ['text'],
        value: [' '],
      },
    }
    dispatch(changeNewSubPostName(newSubPost))
  }
}

export function putSP() {
  return async (dispatch, getState) => {
    const state = getState().edit
    let key = state.keys[state.activePost]
    console.log(key)
    dispatch(fetchPostsStart(true))

    try {
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/subPosts.json`,
        state.subPosts
      )
      dispatch(putSubPosts(response.data))
      dispatch(fetchPostsStart(false))
      console.log(response.data)
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}
export function createNewSub() {
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    let newSubPosts = state.subPosts
    let newSubPost = {
      name: '',
      data: {
        type: ['text'],
        value: [' '],
      },
    }
    if (newSubPosts[0].name === '') {
      newSubPosts = []
    }
    newSubPosts.push(state.newSubPost)
    dispatch(createNS(newSubPosts, newSubPost))
    dispatch(putSP(state))
  }
}

export function deleteSubEl(id) {
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    let btnId = getIndexFromSome(id)
    let tmpSubs = state.subPosts
    if (tmpSubs[state.activeSubPost].data.value.length === 1) {
      dispatch(fetchPostsStart(false))
      return alert('Нельзя удалять единственный')
    }
    tmpSubs[state.activeSubPost].data.type.splice(btnId, 1)
    tmpSubs[state.activeSubPost].data.value.splice(btnId, 1)
    dispatch(changeSubPosts(tmpSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function isDisabledButtonsFunction(bool) {
  return (dispatch) => {
    dispatch(fetchPostsStart(bool))
  }
}

export function addHandle(type) {
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    let tempSubs = state.subPosts
    tempSubs[state.activeSubPost].data.type.push(type)
    tempSubs[state.activeSubPost].data.value.push('')
    dispatch(changeSubPosts(tempSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function changeActiveSub(value) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    dispatch(changeActiveSubPost(value))
    dispatch(fetchPostsStart(false))
  }
}

export function changeSubPost(event) {
  return (dispatch, getState) => {
    const state = getState().edit
    let tempSubs = state.subPosts
    tempSubs[state.activeSubPost].name = event.target.value
    dispatch(changeSubPosts(tempSubs))
  }
}

export function fetchSubPosts(id) {
  return async (dispatch, getState) => {
    const state = getState().edit
    let keyDB = state.keys[id]
    let activePost = id
    console.log(keyDB)
    console.log(activePost)
    dispatch(fetchPostsStart(true))
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )
      dispatch(changeActiveSubPost(0))
      dispatch(fetchSubPostsSuccess(response.data.subPosts, activePost))
      dispatch(fetchPostsStart(false))
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

export function changeNewSubPostName(newSubPost) {
  return {
    type: CHANGE_SUBPOST_NAME,
    newSubPost,
  }
}

export function newPostNameHandle(newPostName) {
  return {
    type: NEW_POSTNAME_HANDLE,
    newPostName,
  }
}

export function createNS(subPosts, newSubPost) {
  return {
    type: CREATE_NEW_SUBPOST,
    subPosts,
    newSubPost,
  }
}

export function changeNP(newPost) {
  return {
    type: CHANGE_NEW_POST,
    newPost,
  }
}
export function newPostAdd(posts, newPost, keys) {
  return {
    type: NEW_POST_ADD,
    posts,
    newPost,
    keys,
  }
}

export function fetchPostsStart(bool) {
  return {
    type: FETCH_POSTS_START,
    bool,
  }
}

export function putSubPosts(subPosts) {
  return {
    type: PUT_SUBPOSTS,
    subPosts,
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
