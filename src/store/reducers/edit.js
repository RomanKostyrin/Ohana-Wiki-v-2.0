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
  PUT_SUBPOSTS,
  NEW_POST_ADD,
  CREATE_NEW_SUBPOST,
  SET_ACTIVE_POST,
  SHOW_IMG,
  SET_LINKS,
  CHANGE_CHECKBOX,
  SET_PERMISSIONS,
  SET_SUBPOST_LINKS,
} from '../actions/actionTypes'

// сделать инишиал в отдельный файл и брать данные оттуда.
// в инишиал загрузить с сервера все кроме fullPostsWithPerms и subPosts сразу
// и обновлять только когда что то изменит админ в админ панели, после кнопки сохранить.
const initialState = {
  permissions: [
    { post: ['bb@ss.ru'], subposts: [] },
    { post: ['bb@ss.ru'], subposts: [] },
  ],
  posts: [],
  fullPostsWithPerms: {
    key: {
      name: 'postname',
      permissions: ['ss@ss.ru'],
      subPosts: [
        {
          data: { type: 'text', value: '1' },
          name: 'subpost',
          permissions: ['ss@ss.ru'],
        },
      ],
    },
  },
  keys: [],
  userList: ['ss@ss.ru', 'enemy-iubip@mail.ru'],
  links: ['0'],
  subPostLinks: ['0'],
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
  newPostName: '',
  newSubPost: {
    name: '',
    data: {
      type: ['text'],
      value: [' '],
    },
  },
  isDisabledButtons: true,
  error: null,
  imgId: '',
  imgClass: '',
  imgButtonClass: '',
}

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_POST:
      return {
        ...state,
        activePost: action.activePost,
      }
    case SET_LINKS:
      return {
        ...state,
        links: action.links,
      }
    case CHANGE_SUBPOST_NAME:
      return {
        ...state,
        newSubPost: action.newSubPost,
      }
    case CREATE_NEW_SUBPOST:
      return {
        ...state,
        subPosts: action.subPosts,
        newSubPost: action.newSubPost,
      }
    case CHANGE_NEW_POST:
      return {
        ...state,
        newPostName: action.newPostName,
      }
    case CHANGE_CHECKBOX:
      return {
        ...state,
        fullPostsWithPerms: action.fullPostsWithPerms,
      }
    case SHOW_IMG:
      return {
        ...state,
        imgClass: action.imgClass,
        imgId: action.imgId,
        imgButtonClass: action.imgButtonClass,
      }
    case SET_PERMISSIONS:
      return {
        ...state,
        permissions: action.permissions,
      }
    case NEW_POST_ADD:
      return {
        ...state,
        posts: action.posts,
        newPostName: action.newPostName,
        keys: action.keys,
      }
    case CHANGE_ACTIVE_SUBPOST:
      return {
        ...state,
        activeSubPost: action.activeSubPost,
      }
    case FETCH_POSTS_START:
      return {
        ...state,
        isDisabledButtons: action.bool,
      }
    case PUT_SUBPOSTS:
      return {
        ...state,
        subPosts: action.subPosts,
      }
    case SET_SUBPOST_LINKS:
      return {
        ...state,
        subPostLinks: action.subPostLinks,
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isDisabledButtons: false,
        posts: action.posts,
        subPosts: action.subPosts,
        keys: action.keys,
      }
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        isDisabledButtons: false,
        error: action.error,
      }
    case FETCH_SUBPOSTS:
      return {
        ...state,
        activePost: action.activePost,
        subPosts: action.subPosts,
      }
    case NEW_POSTNAME_HANDLE:
      return {
        ...state,
        newPostName: action.newPostName,
      }
    case CHANGE_SUBPOSTS:
      return {
        ...state,
        subPosts: action.subPosts,
      }
    default:
      return state
  }
}
