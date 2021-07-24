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
  SET_ACTIVE_POST,
  SHOW_IMG,
  SET_LINKS,
  CHANGE_CHECKBOX,
} from './actionTypes'
import { MainPost, SubPost } from '../../Utilits/state'
import translit from '../../Utilits/translator'
const getIndexFromSome = (string, value = '-') => {
  return string.slice(string.indexOf(value) + 1, string.length)
}
const getNameFromSome = (string, value = '-') => {
  return string.slice(0, string.indexOf(value))
}

export function getPermissions() {
  return async (dispatch) => {
    dispatch(fetchPostsStart(true))
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/permissions/-MedBz7V9TWeKhoLOJm9.json`
      )
      dispatch(setPerms(response.data))
      dispatch(fetchPostsStart(false))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function savePermissions(event) {
  event.preventDefault()
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    try {
      await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/permissions/-MedBz7V9TWeKhoLOJm9.json`,
        state.permissions
      )
      dispatch(fetchPostsStart(false))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function onSubmitP() {
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const obj = new MainPost(state.newPostName)
    const response = await axios.post(
      'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      obj
    )
    const keys = state.keys
    keys.push(response.data.name)
    const allPosts = state.posts
    allPosts.push(state.newPostName)
    dispatch(newPostAdd(allPosts, '', keys))
    dispatch(fetchPostsStart(false))
  }
}

async function putPost(state, newSubPost = 0) {
  const postKey = state.keys[state.activePost]
  const name =
    state.newPostName !== '' ? state.newPostName : state.posts[state.activePost]
  const newPost = new MainPost(name, state.subPosts)
  if (newSubPost !== 0) {
    newPost.addSubPost(newSubPost)
  }
  console.log(newPost)
  const response = await axios.put(
    `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${postKey}.json`,
    newPost
  )
  return response
}

export function saveEditorHandle() {
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const response = await putPost(state, 0)
    console.log(response)
    dispatch(putSubPosts(response.data.subPosts))
    dispatch(fetchPostsStart(false))
  }
}

export function createNewSub() {
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const newSubPost = new SubPost(state.newSubPost.name)
    await putPost(state, newSubPost)
    dispatch(fetchPostsStart(false))
  }
}

export function changePostName(value) {
  return (dispatch) => {
    dispatch(fetchPostsStart(false))
    dispatch(changeNP(value))
    dispatch(fetchPostsStart(false))
  }
}

export function onChangeCheckbox(event) {
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const typeOfPostOnCheckbox = getNameFromSome(event.target.name)
    const numberOfPost = getIndexFromSome(event.target.value)
    const numberOfSubPost = getIndexFromSome(event.target.id)
    const numberOfUser = getIndexFromSome(event.target.name)
    const permissions = getState().edit.permissions

    typeOfPostOnCheckbox === 'post'
      ? (permissions[numberOfUser].perms[numberOfPost].permPost =
          event.target.checked)
      : (permissions[numberOfUser].perms[numberOfPost].perms[numberOfSubPost] =
          event.target.checked)

    dispatch(setPerms(permissions))
    dispatch(fetchPostsStart(false))
  }
}

export function onImgClick(event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const state = getState().edit
    const ImgId =
      state.imgClass === '' ? Number(getIndexFromSome(event.target.id)) : ''
    const ImgClass = state.imgClass === '' ? 'modalImg' : ''
    const ImgButtonClass = state.imgClass === '' ? 'modalWrapper' : ''

    dispatch(showImg(ImgId, ImgClass, ImgButtonClass))
  }
}

export function onChangeText(event) {
  return (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const indexOfTextArea = getIndexFromSome(event.target.id)
    const tempSubs = state.subPosts
    tempSubs[state.activeSubPost].data.value[indexOfTextArea] =
      event.target.value
    dispatch(changeSubPosts(tempSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function newPostNameFunction(value) {
  return (dispatch) => {
    dispatch(newPostNameHandle(value))
  }
}

export function pathImg(event) {
  return (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const tempSubs = state.subPosts
    const pathId = getIndexFromSome(event.target.id)
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

export function deleteSubEl(id) {
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    const tmpSubs = state.subPosts
    if (tmpSubs[state.activeSubPost].data.value.length === 1) {
      dispatch(fetchPostsStart(false))
      return alert('Нельзя удалять единственный')
    }
    tmpSubs[state.activeSubPost].data.type.splice(getIndexFromSome(id), 1)
    tmpSubs[state.activeSubPost].data.value.splice(getIndexFromSome(id), 1)
    dispatch(changeSubPosts(tmpSubs))
    dispatch(fetchPostsStart(false))
  }
}

export function getActivePost(match) {
  return (dispatch, getState) => {
    const state = getState().edit
    let activePost = 0
    for (let i = 0; i < state.links.length; i++) {
      if (match === state.links[i]) {
        activePost = i
      }
    }
    dispatch(setActiveP(+activePost))
  }
}

export function isDisabledButtonsFunction(bool) {
  return (dispatch) => {
    dispatch(fetchPostsStart(bool))
  }
}

export function setActivePost(postNumber) {
  return (dispatch) => {
    dispatch(setActiveP(Number(getIndexFromSome(postNumber))))
  }
}

export function addHandle(type) {
  return (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const tempSubs = state.subPosts
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
    const tempSubs = state.subPosts
    tempSubs[state.activeSubPost].name = event.target.value
    dispatch(changeSubPosts(tempSubs))
  }
}

export function fetchSubPosts(event, isNavigation = false) {
  return async (dispatch, getState) => {
    dispatch(fetchPostsStart(true))
    const state = getState().edit
    const keyDB = isNavigation
      ? state.keys[getIndexFromSome(event.target.id)]
      : state.keys[event.target.value]
    const activePost = isNavigation
      ? getIndexFromSome(event.target.id)
      : event.target.value

    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )
      dispatch(changeActiveSubPost(0))
      dispatch(fetchSubPostsSuccess(response.data.subPosts, +activePost))
      dispatch(fetchPostsStart(false))
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}

export function onClickSubPost(activeSubPost) {
  return (dispatch) => {
    dispatch(changeActiveSubPost(Number(getIndexFromSome(activeSubPost))))
  }
}

export function fetchPosts() {
  return async (dispatch) => {
    dispatch(fetchPostsStart(true))
    try {
      const res = await axios.get(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      const arrPosts = []
      const keys = []
      const links = []
      console.log(res.data)
      Object.keys(res.data).forEach((key) => {
        links.push(translit(res.data[key].name.toLowerCase()))
        keys.push(key)
        console.log(arrPosts)
        arrPosts.push(res.data[key].name)
      })

      const arrSubPosts = res.data[keys[0]].subPosts
      dispatch(fetchPostsSuccess(arrPosts, arrSubPosts, keys))
      dispatch(setLinks(links))
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
export function showImg(imgId, imgClass, imgButtonClass) {
  return {
    type: SHOW_IMG,
    imgId,
    imgClass,
    imgButtonClass,
  }
}
export function setPerms(permissions) {
  return {
    type: CHANGE_CHECKBOX,
    permissions,
  }
}
export function changeSubPosts(subPosts) {
  return {
    type: CHANGE_SUBPOSTS,
    subPosts,
  }
}
export function savePerms(permissions) {
  console.log(permissions)
  return {
    type: CHANGE_CHECKBOX,
    permissions,
  }
}
export function fetchSubPostsSuccess(subPosts, activePost) {
  return {
    type: FETCH_SUBPOSTS,
    subPosts,
    activePost,
  }
}
export function setActiveP(activePost) {
  console.log(activePost)
  return {
    type: SET_ACTIVE_POST,
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
export function changeNP(newPostName) {
  return {
    type: CHANGE_NEW_POST,
    newPostName,
  }
}
export function newPostAdd(posts, newPostName, keys) {
  console.log(newPostName)
  return {
    type: NEW_POST_ADD,
    posts,
    keys,
    newPostName,
  }
}
export function setLinks(links) {
  return {
    type: SET_LINKS,
    links,
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
