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
} from '../actions/actionTypes'

const initialState = {
  permissions: [
    {
      email: 'ss@ss.ru',
      perms: [
        {
          post: 'Пользователи',
          permPost: true,
          subPosts: ['Удаление', 'Редактирование'],
          perms: [true, true],
        },
        {
          post: 'Номенклатура',
          permPost: true,
          subPosts: ['Удаление', 'Редактирование'],
          perms: [true, true],
        },
      ],
    },
    {
      email: 'enemy-iubip@mail.ru',
      perms: [
        {
          post: 'Пользователи',
          perms: [true, true],
          permPost: true,
          subPosts: ['Удаление', 'Редактирование'],
        },
        {
          post: 'Номенклатура',
          perms: [true, true],
          permPost: true,
          subPosts: ['Удаление', 'Редактирование'],
        },
      ],
    },
  ],
  posts: ['', ''],
  keys: [],
  links: ['0'],
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
      console.log(action.permissions)
      return {
        ...state,
        permissions: action.permissions,
      }
    case SHOW_IMG:
      return {
        ...state,
        imgClass: action.imgClass,
        imgId: action.imgId,
        imgButtonClass: action.imgButtonClass,
      }
    case NEW_POST_ADD:
      console.log(action.newPostName)
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
