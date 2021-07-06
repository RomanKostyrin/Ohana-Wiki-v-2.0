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

export function onSubmitP(props) {
  return async (dispatch) => {
    dispatch(fetchPostsStart(true))
    try {
      const response = await axios.post(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        props.newPost
      )
      console.log(response)
      let keys = props.keys
      keys.push(response.data.name)
      let arr = props.posts
      let newPost = { postName: '', subPosts: [{}] }
      arr.push(props.newPost.postName)
      dispatch(newPostAdd(arr, newPost, keys))
      dispatch(fetchPostsStart(false))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function onChangeText(props, event) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    const indexOfTextArea = getIndexFromSome(event.target.id)
    const tempSubs = props.subPosts
    tempSubs[props.activeSubPost].data.value[indexOfTextArea] =
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
export function pathImg(props, event) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    let tempSubs = props.subPosts
    let pathId = getIndexFromSome(event.target.id)
    tempSubs[props.activeSubPost].data.value[pathId] = event.target.value
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

export function putSP(props) {
  let key = props.keys[props.activePost]
  console.log(key)
  return async (dispatch) => {
    dispatch(fetchPostsStart(true))

    try {
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}/subPosts.json`,
        props.subPosts
      )
      dispatch(putSubPosts(response.data))
      dispatch(fetchPostsStart(false))
      console.log(response.data)
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}
export function createNewSub(props) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    let newSubPosts = props.subPosts
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
    newSubPosts.push(props.newSubPost)
    dispatch(createNS(newSubPosts, newSubPost))
    dispatch(putSP(props))
  }
}

export function deleteSubEl(props, id) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    let btnId = getIndexFromSome(id)
    let tmpSubs = props.subPosts
    if (tmpSubs[props.activeSubPost].data.value.length === 1) {
      dispatch(fetchPostsStart(false))
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

export function addHandle(props, type) {
  return (dispatch) => {
    dispatch(fetchPostsStart(true))
    let tempSubs = props.subPosts
    tempSubs[props.activeSubPost].data.type.push(type)
    tempSubs[props.activeSubPost].data.value.push('')
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
