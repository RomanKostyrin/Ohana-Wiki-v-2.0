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
  CLEAR_EDITOR,
} from './actionTypes'

function translit(word) {
  var answer = ''
  var converter = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ь: '',
    ы: 'y',
    ъ: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  for (var i = 0; i < word.length; ++i) {
    if (word[i] !== ' ') {
      if (converter[word[i]] === undefined) {
        answer += word[i]
      } else {
        answer += converter[word[i]]
      }
    }
  }

  return answer
}

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

export function onImgClick(event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const state = getState().edit
    let ImgId = ''
    let ImgClass = ''
    let ImgButtonClass = ''
    if (state.imgClass === '') {
      ImgId = Number(getIndexFromSome(event.target.id))
      ImgClass = 'modalImg'
      ImgButtonClass = 'modalWrapper'
    }
    dispatch(showImg(ImgId, ImgClass, ImgButtonClass))
  }
}

export function onSubmitP(event) {
  event.preventDefault()
  return async (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    try {
      const response = await axios.post(
        'https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        state.newPost
      )
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
  return (dispatch) => {
    dispatch(newPostNameHandle(value))
  }
}
export function pathImg(event) {
  event.preventDefault()
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

export function putSP(event) {
  event.preventDefault()
  return async (dispatch, getState) => {
    const state = getState().edit
    let key = state.keys[state.activePost]
    dispatch(fetchPostsStart(true))
    const letter = {
      postName: state.newPostName,
      subPosts: state.subPosts,
    }
    if (state.newPostName === '') {
      letter.postName = state.posts[state.activePost]
    }
    try {
      const response = await axios.put(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${key}.json`,
        letter
      )
      dispatch(putSubPosts(response.data.subPosts))
      dispatch(fetchPostsStart(false))
      console.log(response.data)
      dispatch(clearEditor)
    } catch (e) {
      dispatch(fetchPostsError(e))
    }
  }
}
export function createNewSub(event) {
  event.preventDefault()
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
    dispatch(putSP(event))
  }
}

export function deleteSubEl(event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const state = getState().edit
    dispatch(fetchPostsStart(true))
    let btnId = getIndexFromSome(event.target.id)
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
export function addHandle(event, type) {
  event.preventDefault()
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

export function fetchSubPosts(event, isNavigation = false) {
  return async (dispatch, getState) => {
    const state = getState().edit
    let keyDB = state.keys[event.target.value]

    let activePost = event.target.value
    if (isNavigation) {
      keyDB = state.keys[getIndexFromSome(event.target.id)]
      activePost = Number(getIndexFromSome(event.target.id))
    }
    dispatch(fetchPostsStart(true))
    try {
      const response = await axios.get(
        `https://ohana-754a1-default-rtdb.europe-west1.firebasedatabase.app/posts/${keyDB}.json`
      )
      dispatch(changeActiveSubPost(0))
      dispatch(fetchSubPostsSuccess(response.data.subPosts, activePost))
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
      let arrPosts = []
      let arrSubPosts = []
      let keys = []
      let links = []
      console.log(res.data)
      Object.keys(res.data).forEach((key) => {
        links.push(translit(res.data[key].postName.toLowerCase()))
        keys.push(key)
        arrPosts.push(res.data[key].postName)
      })
      arrSubPosts = res.data[keys[0]].subPosts

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
export function clearEditor() {
  return {
    type: CLEAR_EDITOR,
    newPostName: '',
  }
}
export function setActiveP(activePost) {
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
